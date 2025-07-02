import { useEffect, useState } from "react";
import { FaqType } from "@/types/faq";

export function useGetFaqGroups() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/faq-groups?populate=*`;
  const [faqGroups, setFaqGroups] = useState<FaqType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

      if (json.data && Array.isArray(json.data)) {
          setFaqGroups(json.data);
      } else {
        setFaqGroups([]);
      }

      } catch (error: any) {
        setError(error.message || "Error al obtener FAQs");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, faqGroups, error };
}