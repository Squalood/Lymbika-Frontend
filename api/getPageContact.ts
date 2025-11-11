import { useEffect, useState } from "react";
import { PageType } from "@/types/pages";

export function useGetPageContact(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages?filters[slug][$eq]=${slug}&populate[Contact][populate]=*`;
  
  const [contact, setContact] = useState<PageType["Contact"] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async() => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        
        if (json.data && json.data.length > 0) {
          setContact(json.data[0].Contact);
        }
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [url]);

  return { contact, loading, error };
}