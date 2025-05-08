"use client"

import { SearchGeneral } from "@/components/searchGeneral";
import { useGetProducts } from "@/api/getProducts";

export default function Page (){
    const { products, loading } = useGetProducts();

    if (loading) return <p>Cargando productos...</p>;

    return(   
        <div id="title" className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col gap-6 justify-between py-4 px-8">
                <h1 className="text-xl font-medium text-muted-foreground">
                    Search
                </h1>
                <SearchGeneral allProducts={products} />
            </div>
            <div className="sm:flex sm:justify-center">
                <div className="grid gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    <h2>Resultado</h2>
                    <h2>Resultado</h2>
                    <h2>Resultado</h2>
                    <h2>Resultado</h2>
                </div>
            </div>
        </div>
    );
}

