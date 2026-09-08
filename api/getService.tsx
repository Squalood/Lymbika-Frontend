import { useEffect, useState } from "react";
import { ServiceType } from "@/types/service";

export function useGetServices() {
    // pageSize explicito: sin el, Strapi aplica su defaultLimit de 25 y las
    // especialidades que sobren desaparecen sin dar error. Hoy hay 15.
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services?populate=*&pagination[pageSize]=100`;
    const [result, setResult] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data); // Asegurar que json.data es un array
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}
