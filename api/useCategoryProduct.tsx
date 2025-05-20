import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";

export function useGetCategoryProduct(slug: string | string[], page: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=1000`;

    const [result, setResult] = useState<ProductType[]>([]);  // ✅ Se especifica el tipo correcto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                
                setResult(json.data || []);  // ✅ Aseguramos que siempre sea un array
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error }; 
}
