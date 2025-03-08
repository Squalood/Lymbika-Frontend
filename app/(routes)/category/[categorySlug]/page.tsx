"use client";
import { useGetCategoryProduct } from "@/api/useCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"; // Eliminé useRouter porque no se usa
import FiltersControlsCategory from "./components/filters-controls-category";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState } from "react";
import ItemsFilterMobile from "./components/filter-type-mobile";

export default function Page() {
    const params = useParams();
    const { categorySlug } = params;

    // 🚨 Verifica que categorySlug exista antes de ejecutar el hook
    const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug ?? '');

    // useState siempre debe ir fuera de condicionales
    const [FilterType, setFilterType] = useState('');

    // 🚨 Evita evaluar `result` dentro de la constante de filtrado
    const filteredProducts = result && !loading 
        ? (FilterType === '' ? result : result.filter((product: ProductType) => product.tipo === FilterType)) 
        : [];

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {result && !loading && (
                <h1 className="text-3xl font-medium">{result[0].category.categoryName}</h1>
            )}
            <Separator />
            <div className="flex sm:hidden">
                <ItemsFilterMobile setFilterType={setFilterType}/>
                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                    {loading && <SkeletonSchema grid={3} />}

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: ProductType) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        !loading && <p>No hay Productos</p>
                    )}
                </div>
            </div>
            
            <div className="sm:flex sm:justify-between hidden">
                <FiltersControlsCategory setFilterType={setFilterType} />

                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                    {loading && <SkeletonSchema grid={3} />}

                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: ProductType) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        !loading && <p>No hay Productos</p>
                    )}
                </div>
            </div>
        </div>
    );
}
