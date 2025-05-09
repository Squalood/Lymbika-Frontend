"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import Image from "next/image";

type Props = {
  allProducts: ProductType[];
};

export function SearchGeneral({ allProducts }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [filtered, setFiltered] = useState<ProductType[]>([]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term);
      const results = allProducts.filter((p) =>
        p.productName.toLowerCase().includes(term.toLowerCase())
      );
      setFiltered(results);
    } else {
      params.delete("query");
      setFiltered([]);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  const clearSearch = () => {
    setSearchTerm("");
    setFiltered([]);
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        className="pr-10"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto text-sm">
            {filtered.map((product) => {
            const imageUrl =
                product.images?.[0]?.url || // fallback por si no hay formato
                "/placeholder.png"; // imagen por defecto

            return (
                <li
                key={product.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => replace(`/product/${product.slug}`)}
                >
                <Image
                    src={imageUrl}
                    alt={product.productName}
                    width={200}
                    height={200}
                    className="w-10 h-10 object-cover rounded"
                />
                <span>{product.productName}</span>
                </li>
            );
            })}
        </ul>
        )}

    </div>
  );
}