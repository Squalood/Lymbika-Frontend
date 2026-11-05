"use client";

import { ClinicType } from "@/types/clinic";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";
import { CAMPOS_CLINICA } from "@/lib/clinic-fields";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?${CAMPOS_CLINICA}&pagination[pageSize]=100`;

const VACIO: ClinicType[] = [];

const parse = (json: unknown): ClinicType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as ClinicType[]) : VACIO;
};

export function useGetClinics(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { clinics: data, loading, error };
}
