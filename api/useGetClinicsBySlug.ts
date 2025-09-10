import { useEffect, useState } from "react";
import { ClinicType } from "@/types/clinic";

export function useGetClinic(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?filters[slug][$eq]=${slug}&populate=*`;
  const [clinic, setClinic] = useState<ClinicType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setClinic(json.data[0] || null);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error al cargar clínica");
        setLoading(false);
      }
    })();
  }, [url]);

  return { clinic, loading, error };
}