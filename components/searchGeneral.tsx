"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { DoctorType } from "@/types/doctor";
import { ServiceType } from "@/types/service";
import { SugeryType } from "@/types/sugery";
import { CategoryType } from "@/types/category";
import Link from "next/link";
import { Button } from "./ui/button";
import SearchPreview from "./searchPreview";

type Props = {
  allProducts: ProductType[];
  allDoctors: DoctorType[];
  allServices: ServiceType[];
  allSurgeries: SugeryType[];
  allCategories: CategoryType[];
};

type SearchableItem = {
  type: "product" | "doctor" | "service" | "surgery" | "category";
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
};

export function SearchGeneral({
  allProducts,
  allDoctors,
  allServices,
  allSurgeries,
  allCategories,
}: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [filteredResults, setFilteredResults] = useState<SearchableItem[]>([]);

  const filterItems = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term);

      const normalizedTerm = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const results: SearchableItem[] = [
        ...allProducts.filter(p =>
          p.productName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTerm)
        ).map(p => ({
          type: "product" as const,
          id: p.id,
          name: p.productName,
          slug: p.slug,
          imageUrl: p.images?.[0]?.url || "/placeholder.png",
        })),
        ...allDoctors.filter(d =>
          d.doctorName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTerm)
        ).map(d => ({
          type: "doctor" as const,
          id: d.id,
          name: d.doctorName,
          slug: d.slug,
          imageUrl: d.image?.[0]?.url || "/placeholder.png",
        })),
        ...allServices.filter(s =>
          s.serviceName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTerm)
        ).map(s => ({
          type: "service" as const,
          id: s.id,
          name: s.serviceName,
          slug: s.slug,
          imageUrl: s.image?.url || "/placeholder.png",
        })),
        ...allSurgeries.filter(s =>
          s.surgeryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTerm)
        ).map(s => ({
          type: "surgery" as const,
          id: s.id,
          name: s.surgeryName,
          slug: s.slug,
          imageUrl: s.image?.url || "/placeholder.png",
        })),
        ...allCategories.filter(c =>
          c.categoryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedTerm)
        ).map(c => ({
          type: "category" as const,
          id: c.id,
          name: c.categoryName,
          slug: c.slug,
          imageUrl: c.mainImage?.url || "/placeholder.png",
        })),
      ];

      setFilteredResults(results.slice(0, 6)); 
    } else {
      params.delete("query");
      setFilteredResults([]);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredResults([]);
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar productos, doctores, servicios..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          filterItems(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchTerm.trim()) {
            e.preventDefault();
            replace(`/search?query=${encodeURIComponent(searchTerm)}`);
          }
        }}
        className="pr-10"
      />

      {searchTerm && (
        <div className="flex flex-row">
          <Button size="icon" asChild>
            <Link
              href={`/search?query=${encodeURIComponent(searchTerm)}`}
              className="absolute right-1 top-0"
            >
              <ChevronRight />
            </Link>
          </Button>
          <button
            onClick={clearSearch}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {filteredResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-96 overflow-y-auto text-sm">
          <ul>
            {filteredResults.map((item) => (
              <SearchPreview
                key={`${item.type}-${item.id}`}
                type={item.type}
                id={item.id}
                name={item.name}
                slug={item.slug}
                imageUrl={item.imageUrl}
              />
            ))}
          </ul>
          <div className="border-t p-2 text-center">
            <Link
              href={`/search?query=${encodeURIComponent(searchTerm)}`}
              className="text-primary hover:underline text-sm"
            >
              Ver todos los resultados
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
