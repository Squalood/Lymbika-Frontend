"use client";
import { useGetCategoryProduct } from "@/api/useCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation"; 
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
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
    
    const productsPerPage = 6; // 👈 Número de productos por página

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

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {filteredProducts.length > 0 && !loading && (
                <h1 className="text-3xl font-medium">{filteredProducts[0]?.category?.categoryName}</h1>
            )}
            <Separator />

            <div className="flex sm:hidden">
                <ItemsFilterMobile setFilterType={setFilterType} />
                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                    {loading && <SkeletonSchema grid={3} />}

                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        !loading && <p>No hay Productos</p>
                    )}
                </div>
            </div>

            <div className="sm:flex sm:justify-between hidden">
                <FiltersControlsCategory setFilterType={setFilterType} typeFilter={typeFilter}/>

                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                    {loading && <SkeletonSchema grid={6} />}

                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        !loading && <p>No hay Productos</p>
                    )}
                </div>
            </div>

            {/* paginación */}
            <div className="hidden sm:block">
            <PaginationControls page={page} totalFilteredPages={totalFilteredPages} setPage={setPage} />
            </div>

            <div className="block sm:hidden">
            <PaginationControlsMobile page={page} totalFilteredPages={totalFilteredPages} setPage={setPage} />
            </div>

        </div>
    );
}
