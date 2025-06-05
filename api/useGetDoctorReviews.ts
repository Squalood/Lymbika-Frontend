import { ReviewType } from "@/types/review";
import { useEffect, useState } from "react";

export function useGetDoctorReviews(doctorSlug: string | string[]) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!doctorSlug) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?filters[doctor][slug][$eq]=${doctorSlug}&populate=*`
        );
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          setReviews(json.data);
        } else {
          setReviews([]);
        }
      } catch (err: any) {
        setError(err.message || "Error al obtener reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [doctorSlug]);

  return { reviews, loading, error };
}