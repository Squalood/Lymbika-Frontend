import { useEffect, useState } from "react";
import { SugeryType } from "@/types/sugery";

export function useGetSugery() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/surgeries?populate=*`
    const [result, setResult] = useState<SugeryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async() => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data as SugeryType[]); // Asegurar el tipo de dato
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}
