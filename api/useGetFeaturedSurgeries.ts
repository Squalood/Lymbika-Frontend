'use client';
import { useEffect, useState } from "react";

export type FeaturedSurgeryType = {
  id: number;
  name: string;
  slug: string;
  specialtySlug: string;
  description: string;
  imageUrl: string | null;
  comercialidad: number | null;
};

export function useGetFeaturedSurgeries() {
  const [surgeries, setSurgeries] = useState<FeaturedSurgeryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?filters[destacado][$eq]=true&filters[requiereCirugia][$eq]=true&filters[medical_service][has_landing_page][$eq]=true&fields[0]=comercialidad&populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=slug&populate[medical_service][fields][2]=description&populate[medical_service][populate][image][fields][0]=url&populate[medical_service][populate][specialty][fields][0]=slug&pagination[pageSize]=100`
        );
        const json = await res.json();

        if (!json.data || !Array.isArray(json.data)) {
          setSurgeries([]);
          return;
        }

        // Una cirugía puede tener tarifa en varias clínicas. Agrupamos por
        // medical_service y nos quedamos con la comercialidad más alta
        // (número más bajo) de todas sus tarifas.
        const map = new Map<string, FeaturedSurgeryType>();
        for (const rate of json.data) {
          const ms = rate.medical_service;
          const specialtySlug = ms?.specialty?.slug;
          // Sin especialidad no hay URL que construir:
          // /specialty/[specialtySlug]/[medicalServiceSlug]
          if (!ms?.slug || !specialtySlug) continue;

          const existing = map.get(ms.slug);
          if (!existing) {
            map.set(ms.slug, {
              id: ms.id,
              name: (ms.name ?? "").trim(),
              slug: ms.slug,
              specialtySlug,
              description: (ms.description ?? "").trim(),
              imageUrl: ms.image?.url ?? null,
              comercialidad: rate.comercialidad ?? null,
            });
          } else if (
            rate.comercialidad != null &&
            (existing.comercialidad === null ||
              rate.comercialidad < existing.comercialidad)
          ) {
            existing.comercialidad = rate.comercialidad;
          }
        }

        // comercialidad solo ordena (1 = más arriba). Las que no la tengan van
        // al final en orden alfabético, para que no desaparezcan del menú si en
        // Strapi marcan destacado + requiereCirugia y se les olvida el orden.
        const sorted = Array.from(map.values()).sort((a, b) => {
          if (a.comercialidad !== b.comercialidad) {
            if (a.comercialidad === null) return 1;
            if (b.comercialidad === null) return -1;
            return a.comercialidad - b.comercialidad;
          }
          return a.name.localeCompare(b.name, "es");
        });

        setSurgeries(sorted);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al obtener cirugías destacadas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, []);

  return { surgeries, loading, error };
}
