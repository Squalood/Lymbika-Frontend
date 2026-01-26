"use client";
import { useGetCategoryProduct } from "@/api/useCategoryProduct";
import { useGetCategories } from "@/api/getCategories";
import { Separator } from "@/components/ui/separator";
import { useParams, useSearchParams } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeleton/skeletonSchema";
import { ProductType } from "@/types/product";
import { useState, useEffect } from "react";
import ItemsFilterMobile from "./components/filter-type-mobile";
import PaginationControls from "./components/pagination";
import { Search } from "@/components/searchBar";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonList from "@/components/skeleton/skeletonList";
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

// Configuración de productos por página según dispositivo
const PRODUCTS_PER_PAGE_MOBILE = 8;  // 2 cols x 4 filas
const PRODUCTS_PER_PAGE_DESKTOP = 9; // 3 cols x 3 filas

export default function Page() {
    const params = useParams();
    const { categorySlug } = params;
    const { result: categories } = useGetCategories();

    const [page, setPage] = useState(1);
    const [typeFilter, setFilterType] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [totalFilteredPages, setTotalFilteredPages] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es móvil (coincide con md:hidden del CSS)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const productsPerPage = isMobile ? PRODUCTS_PER_PAGE_MOBILE : PRODUCTS_PER_PAGE_DESKTOP;

    // ✅ Llamamos a la API con todos los productos de la categoría
    const { result, loading } = useGetCategoryProduct(categorySlug ?? '', 1);

    //Lee el query desde los parámetros de búsqueda
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";


    // 🔹 Aplicamos el filtro antes de paginar
    useEffect(() => {
        if (result && !loading) {
          let filtered = result;
      
          // Filtro por tipo
          if (typeFilter) {
            filtered = filtered.filter((product) => product.tipo === typeFilter);
          }
      
          // Filtro por búsqueda
          if (query) {
            filtered = filtered.filter((product) =>
              product.productName.toLowerCase().includes(query)
            );
          }
      
          setFilteredProducts(filtered);
          setTotalFilteredPages(Math.ceil(filtered.length / productsPerPage));
          setPage(1);
        }
      }, [result, typeFilter, loading, query, productsPerPage]);

    // 🔹 Hacer scroll hacia arriba al cambiar de página
    useEffect(() => {
    const titleElement = document.getElementById("title");
    if (titleElement) {
        titleElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    }, [page]);

    // 🔹 Obtener productos de la página actual
    const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

    const renderProductList = (skeletonCount: number) => {
        if (loading) {
          return <SkeletonSchema grid={skeletonCount} />;
        }
      
        if (paginatedProducts.length > 0) {
          return paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ));
        }

        return <p className="col-span-full text-center text-gray-500">No hay Productos</p>;
      };
    
    return (
        <div id="title" className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            
          {/* Título de categoría */}
          <div className="flex flex-col gap-6 sm:flex-row justify-between py-4 px-4">
              {loading ? (
                    <Skeleton className="w-60 h-10"/>
              ) : filteredProducts.length > 0 ? (
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
                            <Link href={`/category/${category.slug}`}>
                              {category.categoryName}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
              ) : (
                  <h1 className="text-xl font-medium text-muted-foreground">
                  Búsqueda no encontrada
                  </h1>
              )}
              {loading ? (
                  <Skeleton className="w-full sm:w-1/3 h-10"/>
              ) : (
              <div className="w-full sm:w-80">
                <Search category={filteredProducts[0]?.category?.categoryName} />
              </div>
              )}
          </div>
          <Separator />

          {/* Modo móvil */}
          <div className="flex flex-col mt-4 md:hidden">
              <div className="ml-7">
                <ItemsFilterMobile setFilterType={setFilterType} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-1 sm:gap-4 mx-auto px-2">
                  {renderProductList(8)}
              </div>
          </div>

          {/* Modo escritorio */}
          <div className="hidden md:flex md:justify-between">
              {loading ? (
                    <SkeletonList grid={9}/>  
              ) : (
                  <FiltersControlsCategory setFilterType={setFilterType} typeFilter={typeFilter}/> 
              )}
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderProductList(9)}
              </div>
          </div>

          {/* paginación */}
          <PaginationControls page={page} totalFilteredPages={totalFilteredPages} setPage={setPage}/>
        </div>
    );
}
