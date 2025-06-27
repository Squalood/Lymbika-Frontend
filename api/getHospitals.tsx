import { useEffect, useState } from "react";
import { HospitalType } from "@/types/hospital";

export function useGetHospitals() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hospitals?populate=*`;
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          setHospitals(json.data);
        } else {
          setHospitals([]);
        }
      } catch (error: any) {
        setError(error.message || "Error al obtener hospitales");
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, hospitals, error };
}
