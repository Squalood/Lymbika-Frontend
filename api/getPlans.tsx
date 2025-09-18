import { useEffect, useState } from "react";
import { PageType } from "@/types/pages";

export function useGetPlan(slug: string) {
  const [plan, setPlan] = useState<PageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!slug) return; 

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}&populate[plan][populate]=*`;

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        setPlan(json.data ?? []);
      } catch (err: any) {
        setError(err.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return { plan, loading, error };
}