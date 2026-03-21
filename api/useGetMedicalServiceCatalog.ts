'use client';
import { useEffect, useState } from "react";
import { MedicalServiceType } from "@/types/medicalService";

export type MedicalServiceCatalogItem = {
  service: MedicalServiceType;
  minPrice: number;
};

export function useGetMedicalServiceCatalog() {
  const [items, setItems] = useState<MedicalServiceCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=slug&populate[medical_service][fields][2]=type&populate[medical_service][fields][3]=description&populate[medical_service][populate][image][fields][0]=url&populate[medical_service][populate][specialty][fields][0]=slug&pagination[pageSize]=100`
        );
        const json = await res.json();

        if (!json.data || !Array.isArray(json.data)) {
          setItems([]);
          return;
        }

        // Agrupar por medical_service.slug y calcular precio mínimo
        const map = new Map<string, MedicalServiceCatalogItem>();
        for (const rate of json.data) {
          const ms: MedicalServiceType = rate.medical_service;
          if (!ms?.slug) continue;
          const existing = map.get(ms.slug);
          if (!existing) {
            map.set(ms.slug, { service: ms, minPrice: rate.price });
          } else if (rate.price < existing.minPrice) {
            existing.minPrice = rate.price;
          }
        }

        setItems(Array.from(map.values()));
      } catch (err: any) {
        setError(err.message || "Error al obtener servicios médicos");
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, []);

  return { items, loading, error };
}
