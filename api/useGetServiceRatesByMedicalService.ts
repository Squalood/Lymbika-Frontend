'use client';
import { useEffect, useState } from "react";
import { ServiceRateWithDoctorType } from "@/types/medicalService";

export function useGetServiceRatesByMedicalService(medicalServiceSlug: string) {
  const [rates, setRates] = useState<ServiceRateWithDoctorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!medicalServiceSlug) return;

    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?filters[medical_service][slug][$eq]=${medicalServiceSlug}&populate[doctor][fields][0]=doctorName&populate[doctor][fields][1]=slug&populate[doctor][populate][image][fields][0]=url&populate[doctor][populate][clinic][fields][0]=title&populate[doctor][populate][clinic][fields][1]=slug`
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

    fetch_();
  }, [medicalServiceSlug]);

  return { rates, loading, error };
}
