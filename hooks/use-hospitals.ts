"use client";

import { HospitalType } from "@/types/hospital";
import { parseLista, useSharedResource } from "@/lib/client-resource";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hospitals?populate=*`;
const VACIO: HospitalType[] = [];

export function useGetHospitals() {
  const { data, loading, error } = useSharedResource(ENDPOINT, parseLista<HospitalType>, VACIO);
  return { hospitals: data, loading, error };
}
