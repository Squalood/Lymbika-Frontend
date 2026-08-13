"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import SearchResultsDropdown from "./search-results-dropdown";
import { SearchableType } from "@/types/search";

// Fuera del componente para que la referencia sea estable entre renders
const SEARCH_TYPES: SearchableType[] = ["service", "medicalService"];

const DEFAULT_PLACEHOLDER = "¿Qué cirugía necesitas?";
const DEFAULT_BUTTON_TEXT = "Buscar";
const DEFAULT_SUGGESTIONS = ["Columna", "Hernia", "Estética", "Ginecología..."];

type HeroSearchBarProps = {
  placeholder?: string | null;
  suggestions?: string[] | null;
  buttonText?: string | null;
  className?: string;
};

const HeroSearchBar = ({
  placeholder,
  suggestions,
  buttonText,
  className,
}: HeroSearchBarProps) => {
  // Los valores por defecto de las props solo cubren `undefined`, y Strapi
  // manda cadenas vacías cuando un campo aún no se llena: se resuelven aquí
  // para que la barra nunca quede sin texto.
  const placeholderText = placeholder?.trim() || DEFAULT_PLACEHOLDER;
  const buttonLabel = buttonText?.trim() || DEFAULT_BUTTON_TEXT;
  const suggestionList = suggestions?.filter((s) => s?.trim()) ?? [];
  const visibleSuggestions = suggestionList.length ? suggestionList : DEFAULT_SUGGESTIONS;

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
      {/* En móviles estrechos se apila: el texto ocupa todo el ancho y el
          botón pasa debajo. Desde sm vuelve a una sola fila. */}
      <div className="flex w-full flex-col gap-2 rounded-2xl bg-white p-3 shadow-xl sm:flex-row sm:items-center sm:gap-3 sm:p-2 sm:pl-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Search className="size-5 shrink-0 text-primary sm:size-6" />

          <div className="min-w-0 flex-1">
            {/* min-w-0 también en el input: sin eso conserva su ancho
                intrínseco (~20 caracteres) y desborda la barra */}
            <input
              type="text"
              placeholder={placeholderText}
              aria-label={placeholderText}
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full min-w-0 bg-transparent text-base font-semibold text-primary outline-none placeholder:text-primary"
            />
            <p className="truncate text-xs text-gray-400 sm:text-sm">
              {visibleSuggestions.join(" · ")}
            </p>
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
        </div>

        <Button
          type="button"
          onClick={goToSearch}
          className="h-11 w-full shrink-0 rounded-xl text-sm font-semibold sm:h-12 sm:w-auto sm:px-8 sm:text-base"
        >
          {buttonLabel}
        </Button>
      </div>

      <SearchResultsDropdown results={results} searchHref={searchHref} />
    </div>
  );
};

export default HeroSearchBar;
