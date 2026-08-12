"use client";

import Link from "next/link";
import SearchPreview from "./searchPreview";
import { cn } from "@/lib/utils";
import { SearchableItem } from "@/types/search";

type SearchResultsDropdownProps = {
  results: SearchableItem[];
  searchHref: string;
  footerText?: string;
  className?: string;
};

/** Lista de resultados del preview de búsqueda. Compartida por todas las barras. */
const SearchResultsDropdown = ({
  results,
  searchHref,
  footerText = "Ver todos los resultados",
  className,
}: SearchResultsDropdownProps) => {
  if (results.length === 0) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-md border bg-white text-sm text-black shadow-md",
        className
      )}
    >
      <ul>
        {results.map((item) => (
          <SearchPreview
            key={`${item.type}-${item.id}`}
            type={item.type}
            id={item.id}
            name={item.name}
            slug={item.slug}
            imageUrl={item.imageUrl}
            sal={item.sal}
            icon={item.icon}
            medicalServiceType={item.medicalServiceType}
            specialtySlug={item.specialtySlug}
          />
        ))}
      </ul>
      <div className="border-t p-2 text-center">
        <Link href={searchHref} className="text-sm text-primary hover:underline">
          {footerText}
        </Link>
      </div>
    </div>
  );
};

export default SearchResultsDropdown;
