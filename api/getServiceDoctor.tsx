import { useEffect, useState } from "react";
import { DoctorType } from "@/types/doctor";

export function useGetServiceDoctor(slug: string) {
    const url = slug 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?populate=*&filters[service][slug][$eq]=${slug}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?populate=*`; // Si no hay slug, trae todos

    const [result, setResult] = useState<DoctorType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();


                if (json.data && Array.isArray(json.data)) {
                    setResult(json.data);
                } else {
                    setResult([]);
                }
                setLoading(false);
            } catch (error: any) {
                setError("No se pudo obtener los datos de los doctores");
                setLoading(false);
            }
        })();
    }, [slug]);

    return { loading, result, error };
}
