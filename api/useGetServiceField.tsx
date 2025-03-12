
import { ResultServiceFilterTypes } from "@/types/servicefilters";
import { useEffect, useState } from "react";

export function useGetServiceField() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-type-builder/content-types/api::service.service`
        const [result, setResult] = useState<ResultServiceFilterTypes | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
    
        useEffect(() => {
            (async() => {
                try {
                    const res = await fetch (url)
                    const json = await res.json()
                    setResult(json.data)
                    setLoading(false)
                } catch (error: any){
                    setError(error)
                    setLoading(false)
                }
            })()
        }, [url])
    
        return { loading, result, error};
}