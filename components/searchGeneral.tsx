"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { DoctorType } from "@/types/doctor";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  allProducts: ProductType[];
  allDoctors: DoctorType[];
};

export function SearchGeneral({ allProducts, allDoctors }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorType[]>([]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term.trim()) {
      params.set("query", term);

      const productResults = allProducts.filter((p) =>
        p.productName.toLowerCase().includes(term.toLowerCase())
      );
      const doctorResults = allDoctors.filter((d) =>
        d.doctorName.toLowerCase().includes(term.toLowerCase())
      );

      setFilteredProducts(productResults);
      setFilteredDoctors(doctorResults);
    } else {
      params.delete("query");
      setFilteredProducts([]);
      setFilteredDoctors([]);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProducts([]);
    setFilteredDoctors([]);
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Buscar productos o doctores..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
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

      {(filteredProducts.length > 0 || filteredDoctors.length > 0) && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-96 overflow-y-auto text-sm">
          <ul>
            {filteredProducts.map((product) => {
              const imageUrl = product.images?.[0]?.url || "/placeholder.png";
              return (
                <li
                  key={`product-${product.id}`}
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
            {filteredDoctors.map((doctor) => {
              const imageUrl = doctor.image?.[0]?.url || "/placeholder.png";
              return (
                <li
                  key={`doctor-${doctor.id}`}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => replace(`/doctor/${doctor.slug}`)}
                >
                  <Image
                    src={imageUrl}
                    alt={doctor.doctorName}
                    width={200}
                    height={200}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <span>{doctor.doctorName}</span>
                </li>
              );
            })}
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
