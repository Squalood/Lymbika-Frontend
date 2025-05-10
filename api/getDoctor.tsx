import { DoctorType } from "@/types/doctor";
import { useEffect, useState } from "react";

export function useGetDoctors() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?populate=*`;
  const [doctors, setResult] = useState<DoctorType[]>([]);
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
        setError(error.message || "Error al obtener doctores");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, doctors, error };
}