import { useEffect, useState } from "react";
import { ClinicType } from "@/types/clinic";

export function useGetClinicDoctor(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?filters[slug][$eq]=${slug}&populate[doctor][populate]=*`;
  const [DoctorClinic, setDoctorClinic] = useState<ClinicType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setDoctorClinic(json.data[0] || null);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error al cargar clínica");
        setLoading(false);
      }
    })();
  }, [url]);

  return { DoctorClinic, loading, error };
}