"use client";
import { useGetCategoryProduct } from "@/api/useCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation"; 
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeleton/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState, useEffect } from "react";
import ItemsFilterMobile from "./components/filter-type-mobile";
import PaginationControls from "./components/pagination";
import PaginationControlsMobile from "./components/paginationMobile";

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

    // 🔹 Aplicamos el filtro antes de paginar
    useEffect(() => {
        if (result && !loading) {
            // Usar 'const' porque no vamos a reasignar el valor de 'filtered'
            const filtered = typeFilter === '' ? result : result.filter((product) => product.tipo === typeFilter);

            setFilteredProducts(filtered);
            
            // 🔹 Calcular número de páginas según el resultado filtrado
            setTotalFilteredPages(Math.ceil(filtered.length / productsPerPage));

            // 🔹 Reiniciar a la página 1 si se cambia el filtro
            setPage(1);
        }
    }, [result, typeFilter, loading]);

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
            {filteredProducts.length > 0 && !loading && (
                <h1 className="text-3xl font-medium">
                {filteredProducts[0]?.category?.categoryName}
                </h1>
            )}
            <Separator />

            {/* Modo móvil */}
            <div className="flex flex-col mt-4 sm:hidden">
                <ItemsFilterMobile setFilterType={setFilterType} />
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                {renderProductList(3)}
                </div>
            </div>

            {/* Modo escritorio */}
            <div className="hidden sm:flex sm:justify-between">
                <FiltersControlsCategory
                setFilterType={setFilterType}
                typeFilter={typeFilter}
                />
                <div className="grid gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {renderProductList(6)}
                </div>
            </div>

            {/* paginación */}
            <div className="hidden lg:block">
            <PaginationControls page={page} totalFilteredPages={totalFilteredPages} setPage={setPage}/>
            </div>

            <div className="block lg:hidden">
            <PaginationControlsMobile page={page} totalFilteredPages={totalFilteredPages} setPage={setPage} />
            </div>

        </div>
    );
}