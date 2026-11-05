"use client";

import { ServiceRateWithDoctorType } from "@/types/medicalService";
import { parseLista, useSharedResource } from "@/lib/client-resource";

const VACIO: ServiceRateWithDoctorType[] = [];

export function useGetServiceRatesByMedicalService(medicalServiceSlug: string) {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?filters[medical_service][slug][$eq]=${encodeURIComponent(medicalServiceSlug)}&populate[doctor][fields][0]=doctorName&populate[doctor][fields][1]=slug&populate[doctor][populate][image][fields][0]=url&populate[doctor][populate][bannerImage][fields][0]=url&populate[doctor][populate][clinic][fields][0]=title&populate[doctor][populate][clinic][fields][1]=slug&populate[doctor][populate][services][fields][0]=serviceName&populate[doctor][populate][services][fields][1]=slug`;
  const { data, loading, error } = useSharedResource(
    endpoint,
    parseLista<ServiceRateWithDoctorType>,
    VACIO,
    { enabled: Boolean(medicalServiceSlug) }
  );
  return { rates: data, loading, error };
}
