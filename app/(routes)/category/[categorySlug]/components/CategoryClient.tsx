"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import FiltersControlsCategory from "./filters-controls-category";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import ItemsFilterMobile from "./filter-type-mobile";
import PaginationControls from "./pagination";
import { Search } from "@/components/searchBar";
import ProductCard from "@/components/productCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

const PRODUCTS_PER_PAGE_MOBILE = 8;
const PRODUCTS_PER_PAGE_DESKTOP = 9;

type Props = {
  initialProducts: ProductType[];
  categories: CategoryType[];
};

export default function CategoryClient({ initialProducts, categories }: Props) {
  const [page, setPage] = useState(1);
  const [typeFilter, setFilterType] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(initialProducts);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const productsPerPage = isMobile ? PRODUCTS_PER_PAGE_MOBILE : PRODUCTS_PER_PAGE_DESKTOP;

  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const availableTypes = [...new Set(initialProducts.map((p) => p.tipo).filter(Boolean))];

  useEffect(() => {
    let filtered = initialProducts;
    if (typeFilter) filtered = filtered.filter((p) => p.tipo === typeFilter);
    if (query) filtered = filtered.filter((p) => p.productName.toLowerCase().includes(query));
    setFilteredProducts(filtered);
    setTotalFilteredPages(Math.ceil(filtered.length / productsPerPage));
    setPage(1);
  }, [typeFilter, query, productsPerPage, initialProducts]);

  useEffect(() => {
    const el = document.getElementById("title");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const renderProductList = () => {
    if (paginatedProducts.length > 0) {
      return paginatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ));
    }
    return <p className="col-span-full text-center text-gray-500">No hay Productos</p>;
  };

  return (
    <div id="title" className="max-w-6xl py-4 mx-auto sm:py-16">
      <div className="flex flex-col gap-6 sm:flex-row justify-between py-4 px-4">
        {filteredProducts.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-3xl font-medium hover:text-primary transition-colors">
                {filteredProducts[0]?.category?.categoryName}
                <ChevronDownIcon className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/category/${category.slug}`}>{category.categoryName}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <h1 className="text-xl font-medium text-muted-foreground">Búsqueda no encontrada</h1>
        )}
        <div className="w-full sm:w-80">
          <Search category={filteredProducts[0]?.category?.categoryName} />
        </div>
      </div>
      <Separator />

      {/* Modo móvil */}
      <div className="flex flex-col mt-4 md:hidden">
        <div className="ml-7">
          <ItemsFilterMobile setFilterType={setFilterType} availableTypes={availableTypes} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1 sm:gap-4 mx-auto px-2">
          {renderProductList()}
        </div>
      </div>

      {/* Modo escritorio */}
      <div className="hidden md:flex md:items-start md:gap-8 mt-8">
        <FiltersControlsCategory
          setFilterType={setFilterType}
          typeFilter={typeFilter}
          availableTypes={availableTypes}
        />
        <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No hay Productos</p>
          )}
        </div>
      </div>

      <PaginationControls page={page} totalFilteredPages={totalFilteredPages} setPage={setPage} />
    </div>
  );
}
