"use client";

import { MedicalServiceType } from "@/types/medical-service";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-services?populate[image][fields][0]=url&populate[specialty][fields][0]=slug&pagination[pageSize]=200`;

const VACIO: MedicalServiceType[] = [];

const parse = (json: unknown): MedicalServiceType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as MedicalServiceType[]) : VACIO;
};

export function useGetAllMedicalServices(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { medicalServices: data, loading, error };
}
