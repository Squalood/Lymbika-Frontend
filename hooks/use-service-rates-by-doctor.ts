"use client";

import { ServiceRateType } from "@/types/medicalService";
import { parseLista, useSharedResource } from "@/lib/client-resource";

const VACIO: ServiceRateType[] = [];

export function useGetServiceRatesByDoctor(slug: string) {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?filters[doctor][slug][$eq]=${encodeURIComponent(slug)}&populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=type&populate[medical_service][fields][2]=slug&populate[medical_service][fields][3]=description&populate[medical_service][populate][image][fields][0]=url`;
  const { data, loading, error } = useSharedResource(endpoint, parseLista<ServiceRateType>, VACIO, {
    enabled: Boolean(slug),
  });
  return { rates: data, loading, error };
}
