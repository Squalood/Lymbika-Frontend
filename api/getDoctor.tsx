"use client";

import { DoctorType } from "@/types/doctor";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctors?populate=*&pagination[pageSize]=100`;

const VACIO: DoctorType[] = [];

const parse = (json: unknown): DoctorType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as DoctorType[]) : VACIO;
};

export function useGetDoctors(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { loading, doctors: data, error };
}
