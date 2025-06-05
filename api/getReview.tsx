import { ReviewType } from "@/types/review";
import { useEffect, useState } from "react";

export function useGetReviews() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?populate=*`;
  const [reviews, setResult] = useState<ReviewType[]>([]);
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
      } catch (error: any) {
        setError(error.message || "Error al obtener reviews");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, reviews, error };
}