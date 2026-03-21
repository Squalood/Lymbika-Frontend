'use client';
import { useEffect, useState } from "react";
import { MedicalServiceType } from "@/types/medicalService";

export function useGetAllMedicalServices() {
  const [medicalServices, setMedicalServices] = useState<MedicalServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-services?populate[image][fields][0]=url&populate[specialty][fields][0]=slug`
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
  }, []);

  return { medicalServices, loading, error };
}
