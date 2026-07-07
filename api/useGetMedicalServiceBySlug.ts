'use client';
import { useEffect, useState } from "react";
import { MedicalServiceType } from "@/types/medicalService";

export function useGetMedicalServiceBySlug(slug: string) {
  const [medicalService, setMedicalService] = useState<MedicalServiceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-services` +
          `?filters[slug][$eq]=${slug}` +
          `&populate[landingHero][populate][hero_video][fields][0]=url` +
          `&populate[landingHero][populate][hero_image][fields][0]=url` +
          `&populate[landingStat]=*` +
          `&populate[landingBenefit]=*` +
          `&populate[landing_video_url]=*` +
          `&populate[landing_gallery][fields][0]=url` +
          `&populate[faq_group][populate][faq]=*` +
          `&populate[landingTexts]=*` +
          `&populate[service_rates][populate][doctor][fields][0]=doctorName` +
          `&populate[service_rates][populate][doctor][fields][1]=slug` +
          `&populate[service_rates][populate][doctor][fields][2]=contactButton` +
          `&populate[service_rates][populate][doctor][populate][image][fields][0]=url` +
          `&populate[service_rates][populate][doctor][populate][bannerImage][fields][0]=url`
        );
        const json = await res.json();

        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setMedicalService(json.data[0]);
        } else {
          setMedicalService(null);
        }
      } catch (err: any) {
        setError(err.message || "Error al obtener el servicio médico");
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [slug]);

  return { medicalService, loading, error };
}
