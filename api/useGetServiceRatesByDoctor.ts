'use client';
import { useEffect, useState } from "react";
import { ServiceRateType } from "@/types/medicalService";

export function useGetServiceRatesByDoctor(slug: string) {
  const [rates, setRates] = useState<ServiceRateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?filters[doctor][slug][$eq]=${slug}&populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=type&populate[medical_service][fields][2]=slug&populate[medical_service][fields][3]=description&populate[medical_service][populate][image][fields][0]=url`
        );
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          setRates(json.data);
        } else {
          setRates([]);
        }
      } catch (err: any) {
        setError(err.message || "Error al obtener tarifas");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [slug]);

  return { rates, loading, error };
}
