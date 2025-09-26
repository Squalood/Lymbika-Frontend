import { useEffect, useState } from "react";
import { PageType } from "@/types/pages";

export function useGetPageHero(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}&populate[hero][populate]=image&populate[promo][populate]=image&populate[plan][populate]=plus&populate[plan][populate]=less`;
  const [hero, setPage] = useState<PageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
        (async() => {
            try {
                const res = await fetch (url);
                const json = await res.json();
                setPage(json.data);
                setLoading(false);
            } catch (error: any){
                setError(error);
                setLoading(false);
            }
        })();
    }, [url]);

  return { hero, loading, error };
}