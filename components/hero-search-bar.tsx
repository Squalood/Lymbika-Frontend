"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import SearchResultsDropdown from "./search-results-dropdown";
import { SearchableType } from "@/types/search";

// Fuera del componente para que la referencia sea estable entre renders
const SEARCH_TYPES: SearchableType[] = ["service", "medicalService"];

type HeroSearchBarProps = {
  placeholder?: string;
  suggestions?: string[];
  buttonText?: string;
  className?: string;
};

const HeroSearchBar = ({
  placeholder = "¿Qué cirugía necesitas?",
  suggestions = ["Columna", "Hernia", "Estética", "Ginecología..."],
  buttonText = "Buscar",
  className,
}: HeroSearchBarProps) => {
  const {
    containerRef,
    searchTerm,
    results,
    searchHref,
    handleChange,
    handleKeyDown,
    goToSearch,
    clearSearch,
  } = useSearch({ include: SEARCH_TYPES });

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="flex w-full items-center gap-2 rounded-2xl bg-white p-2 pl-4 shadow-xl sm:gap-3">
        <Search className="size-5 shrink-0 text-primary sm:size-6" />

        <div className="min-w-0 flex-1">
          <input
            type="text"
            placeholder={placeholder}
            aria-label={placeholder}
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm font-semibold text-primary outline-none placeholder:text-primary sm:text-base"
          />
          {suggestions.length > 0 && (
            <p className="truncate text-xs text-gray-400 sm:text-sm">
              {suggestions.join(" · ")}
            </p>
          )}
        </div>

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" />
          </button>
        )}

        <Button
          type="button"
          onClick={goToSearch}
          className="h-11 shrink-0 rounded-xl px-5 text-sm font-semibold sm:h-12 sm:px-8 sm:text-base"
        >
          {buttonText}
        </Button>
      </div>

      <SearchResultsDropdown results={results} searchHref={searchHref} />
    </div>
  );
};

export default HeroSearchBar;
