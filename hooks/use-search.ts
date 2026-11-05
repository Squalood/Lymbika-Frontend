"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useGetProducts } from "@/hooks/use-products";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useGetServices } from "@/hooks/use-services";
import { useGetCategories } from "@/hooks/use-categories";
import { useGetAllMedicalServices } from "@/hooks/use-all-medical-services";
import { useGetClinics } from "@/hooks/use-clinics";
import { ResponseType } from "@/types/response";
import { ServiceType } from "@/types/service";
import { CategoryType } from "@/types/category";
import { SearchableItem, SearchableType } from "@/types/search";
import { sinAcentos as normalize } from "@/lib/utils";

type UseSearchOptions = {
  /** Tipos de contenido en los que se busca. Por defecto, todos. */
  include?: SearchableType[];
  /** Máximo de resultados en el preview. */
  limit?: number;
  /** Retraso del debounce en ms. */
  debounceMs?: number;
  /** Ruta a la que se navega al enviar la búsqueda. */
  searchPath?: string;
};

const ALL_TYPES: SearchableType[] = [
  "product",
  "doctor",
  "service",
  "category",
  "medicalService",
  "clinic",
];

/**
 * Concentra toda la lógica de una barra de búsqueda global: carga de datos,
 * filtrado con debounce, navegación y cierre al hacer click fuera.
 * Los componentes que la usan solo se encargan del diseño.
 *
 * No se descarga nada hasta que el usuario toca la barra (`handleFocus`) o
 * escribe, y solo los catálogos que pide `include`: una barra que solo busca
 * cirugías no se trae los ~3.000 productos de la farmacia.
 */
export function useSearch({
  include = ALL_TYPES,
  limit = 6,
  debounceMs = 300,
  searchPath = "/search",
}: UseSearchOptions = {}) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [activo, setActivo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tiposIncluidos = useMemo(() => new Set(include), [include]);

  /** Un catálogo se pide solo si esta barra busca en él y ya hubo interacción. */
  const pedir = (tipo: SearchableType) => activo && tiposIncluidos.has(tipo);

  const { products } = useGetProducts({ enabled: pedir("product") });
  const { doctors } = useGetDoctors({ enabled: pedir("doctor") });
  const { result: services }: ResponseType = useGetServices({ enabled: pedir("service") });
  const { result: categories }: ResponseType = useGetCategories({ enabled: pedir("category") });
  const { medicalServices } = useGetAllMedicalServices({ enabled: pedir("medicalService") });
  const { clinics } = useGetClinics({ enabled: pedir("clinic") });

  const filterItems = useDebouncedCallback((term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    const q = normalize(term);
    const matches: SearchableItem[] = [];

    if (tiposIncluidos.has("product")) {
      matches.push(
        ...(products ?? [])
          .filter(
            (p) =>
              normalize(p.productName).includes(q) || normalize(p.sal || "").includes(q)
          )
          .map((p) => ({
            type: "product" as const,
            id: p.id,
            name: p.productName,
            sal: p.sal,
            slug: p.slug,
            imageUrl: p.images?.[0]?.url || "/placeholder.png",
          }))
      );
    }

    if (tiposIncluidos.has("doctor")) {
      matches.push(
        ...(doctors ?? [])
          .filter((d) => normalize(d.doctorName).includes(q))
          .map((d) => ({
            type: "doctor" as const,
            id: d.id,
            name: d.doctorName,
            sal: "nulo",
            slug: d.slug,
            imageUrl: d.image?.[0]?.url || "/placeholder.png",
          }))
      );
    }

    if (tiposIncluidos.has("service")) {
      matches.push(
        ...((services ?? []) as ServiceType[])
          .filter((s) => normalize(s.serviceName).includes(q))
          .map((s) => ({
            type: "service" as const,
            id: s.id,
            name: s.serviceName,
            sal: "nulo",
            slug: s.slug,
            imageUrl: s.image?.url || "/placeholder.png",
            icon: s.icon,
          }))
      );
    }

    if (tiposIncluidos.has("category")) {
      matches.push(
        ...((categories ?? []) as CategoryType[])
          .filter((c) => normalize(c.categoryName).includes(q))
          .map((c) => ({
            type: "category" as const,
            id: c.id,
            name: c.categoryName,
            sal: "nulo",
            slug: c.slug,
            imageUrl: c.mainImage?.url || "/placeholder.png",
          }))
      );
    }

    if (tiposIncluidos.has("medicalService")) {
      matches.push(
        ...(medicalServices ?? [])
          // Sin especialidad no hay ruta válida (/specialty/<esp>/<servicio>): se omite
          // para no mandar al usuario a un 404.
          .filter((m) => m.specialty?.slug && normalize(m.name).includes(q))
          .map((m) => ({
            type: "medicalService" as const,
            id: m.id,
            name: m.name,
            sal: "nulo",
            slug: m.slug,
            imageUrl: m.image?.url || "",
            medicalServiceType: m.type,
            specialtySlug: m.specialty?.slug,
          }))
      );
    }

    if (tiposIncluidos.has("clinic")) {
      matches.push(
        ...(clinics ?? [])
          .filter((cl) => normalize(cl.title).includes(q))
          .map((cl) => ({
            type: "clinic" as const,
            id: cl.id,
            name: cl.title,
            sal: "nulo",
            slug: cl.slug,
            imageUrl: "",
            icon: cl.icon,
          }))
      );
    }

    setResults(matches.slice(0, limit));
  }, debounceMs);

  // Los catálogos se piden al enfocar la barra, así que pueden aterrizar
  // después de que el usuario ya escribió. Sin esto se quedaría viendo "sin
  // resultados" sobre unas listas que todavía estaban vacías al filtrar.
  useEffect(() => {
    if (searchTerm.trim()) filterItems(searchTerm);
  }, [
    products,
    doctors,
    services,
    categories,
    medicalServices,
    clinics,
    searchTerm,
    filterItems,
  ]);

  // Cierra el preview al hacer click fuera del contenedor
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchHref = `${searchPath}?query=${encodeURIComponent(searchTerm)}`;

  /** Dispara la carga de catálogos en cuanto el usuario toca la barra. */
  const handleFocus = () => setActivo(true);

  const handleChange = (value: string) => {
    setActivo(true);
    setSearchTerm(value);
    filterItems(value);
  };

  const goToSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(searchHref);
  };

  const clearSearch = () => {
    setSearchTerm("");
    filterItems.cancel();
    setResults([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToSearch();
    }
    if (event.key === "Escape") {
      setResults([]);
    }
  };

  return {
    /** Ponlo en el contenedor de la barra para detectar clicks fuera. */
    containerRef,
    searchTerm,
    results,
    searchHref,
    handleChange,
    handleFocus,
    handleKeyDown,
    goToSearch,
    clearSearch,
  };
}
