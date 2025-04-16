import { useEffect, useState } from "react";
import { DoctorType } from "@/types/doctor";

type CategoryType = "service" | "surgery";

export function useGetDoctorsByCategory(slug: string, type: CategoryType) {
  const [result, setResult] = useState<DoctorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Construye la URL dinámicamente según el tipo
  const url = slug
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?populate=*&filters[${type === "service" ? "services" : "surgeries"}][slug][$eq]=${slug}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?populate=*`;

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
      } catch (err) {
        setError("No se pudo obtener los datos de los doctores.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, type]);

  return { result, loading, error };
}
