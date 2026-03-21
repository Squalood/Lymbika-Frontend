'use client';
import { useEffect, useState } from "react";
import { MedicalServiceType } from "@/types/medicalService";

export function useGetMedicalServicesBySpecialty(specialtySlug: string) {
  const [medicalServices, setMedicalServices] = useState<MedicalServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!specialtySlug) return;

    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-services?filters[specialty][slug][$eq]=${specialtySlug}&populate[image][fields][0]=url`
        );
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          setMedicalServices(json.data);
        } else {
          setMedicalServices([]);
        }
      } catch (err: any) {
        setError(err.message || "Error al obtener servicios médicos");
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [specialtySlug]);

  return { medicalServices, loading, error };
}
