"use client";

import { ServiceType } from "@/types/service";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

// pageSize explicito: sin el, Strapi aplica su defaultLimit de 25 y las
// especialidades que sobren desaparecen sin dar error. Hoy hay 15.
const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services?populate=*&pagination[pageSize]=100`;

const VACIO: ServiceType[] = [];

const parse = (json: unknown): ServiceType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as ServiceType[]) : VACIO;
};

export function useGetServices(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { loading, result: data, error };
}
