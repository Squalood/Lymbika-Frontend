"use client";
import { useGetCategoryProduct } from "@/api/useCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams, useSearchParams } from "next/navigation"; 
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeleton/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState, useEffect } from "react";
import ItemsFilterMobile from "./components/filter-type-mobile";
import PaginationControls from "./components/pagination";
import { Search } from "@/components/searchBar";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonList from "@/components/skeleton/skeletonList";


export default function Page() {
    const params = useParams();
    const { categorySlug } = params;
    
    const [page, setPage] = useState(1);
    const [typeFilter, setFilterType] = useState<string>(''); // Define el estado de typeFilter
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [totalFilteredPages, setTotalFilteredPages] = useState(1);
    
    // ✅ Llamamos a la API con todos los productos de la categoría
    const { result, loading } = useGetCategoryProduct(categorySlug ?? '', 1); // 🚀 Traemos todos los productos en una sola petición
    
    const productsPerPage = 9; // 👈 Número de productos por página

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
      }, [result, typeFilter, loading, query]);

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
            <ProductCard key={product.id} product={product} />
          ));
        }

        return <p className="col-span-full text-center text-gray-500">No hay Productos</p>;
      };

    return (
        <div id="title" className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            
            {/* Título de categoría */}
            <div className="flex flex-col gap-6 sm:flex-row justify-between py-4 px-8">
                {loading ? (
                      <Skeleton className="w-60 h-10"/>  
                ) : filteredProducts.length > 0 ? (
                    <h1 className="text-3xl font-medium">
                    {filteredProducts[0]?.category?.categoryName}
                    </h1>
                ) : (
                    <h1 className="text-xl font-medium text-muted-foreground">
                    Búsqueda no encontrada
                    </h1>
                )}
                {loading ? (
                    <Skeleton className="w-full sm:w-1/3 h-10"/>
                ) : (
                <Search />
                )}
            </div>
            <Separator />

            {/* Modo móvil */}
            <div className="flex flex-col mt-4 sm:hidden">
                <ItemsFilterMobile setFilterType={setFilterType} />
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {renderProductList(9)}
                </div>
            </div>

            {/* Modo escritorio */}
            <div className="hidden sm:flex sm:justify-between">
                {loading ? (
                      <SkeletonList grid={17}/>  
                ) : (
                   <FiltersControlsCategory setFilterType={setFilterType} typeFilter={typeFilter}/> 
                )}
                <div className="grid gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {renderProductList(9)}
                </div>
            </div>

            {/* paginación */}
            <PaginationControls page={page} totalFilteredPages={totalFilteredPages} setPage={setPage}/>
        </div>
    );
}