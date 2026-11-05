"use client";

import { MedicalServiceCatalogItem } from "@/types/medicalService";
import { useSharedResource } from "@/lib/client-resource";
import { agruparCatalogo, TarifaDeCatalogo } from "@/lib/medical-service-catalog";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=slug&populate[medical_service][fields][2]=type&populate[medical_service][fields][3]=description&populate[medical_service][fields][4]=has_landing_page&populate[medical_service][populate][image][fields][0]=url&populate[medical_service][populate][specialty][fields][0]=slug&populate[items][fields][0]=text&pagination[pageSize]=500`;

const VACIO: MedicalServiceCatalogItem[] = [];

/** Catálogo general: un item por servicio médico con su tarifa más barata. */
const parse = (json: unknown): MedicalServiceCatalogItem[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? agruparCatalogo(data as TarifaDeCatalogo[]) : VACIO;
};

export function useGetMedicalServiceCatalog() {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO);
  return { items: data, loading, error };
}
