import { useEffect, useState } from "react";
import { ServiceRateType } from "@/types/medicalService";

type ClinicWithServiceRates = {
  service_rates: ServiceRateType[];
};

export function useGetClinicServices(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?filters[slug][$eq]=${slug}&populate[service_rates][populate][medical_service][populate]=image&populate[service_rates][populate][doctor]=true`;
  const [ServicesClinic, setServicesClinic] = useState<ClinicWithServiceRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setServicesClinic(json.data[0] || null);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error al cargar clínica");
        setLoading(false);
      }
    })();
  }, [url]);

  return { ServicesClinic, loading, error };
}