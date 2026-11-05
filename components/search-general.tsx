"use client";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import SearchResultsDropdown from "./search-results-dropdown";
import { useSearch } from "@/hooks/use-search";
import { SearchableType } from "@/types/search";

type Props = {
  /** Catálogos en los que busca esta barra. Por defecto, todos. */
  include?: SearchableType[];
};

/**
 * Barra de búsqueda del navbar y de la tienda. Carga diferida, filtrado y
 * navegación viven en useSearch, la misma lógica que la barra del hero.
 */
export function SearchGeneral({ include }: Props) {
  const {
    containerRef,
    searchTerm,
    results,
    searchHref,
    handleChange,
    handleFocus,
    handleKeyDown,
    clearSearch,
  } = useSearch({ include });

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar Medicinas, doctores y etc..."
        value={searchTerm}
        onFocus={handleFocus}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pr-10"
      />

      {searchTerm && (
        <div className="flex flex-row">
          <Button size="icon" asChild>
            <Link href={searchHref} className="absolute right-1 top-0">
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

      <SearchResultsDropdown results={results} searchHref={searchHref} className="z-10 mt-1" />
    </div>
  );
}
