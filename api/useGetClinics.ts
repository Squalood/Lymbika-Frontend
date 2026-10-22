"use client";

import { ClinicType } from "@/types/clinic";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

/**
 * Campos que consumen los menús, el listado de clínicas y el buscador.
 *
 * Antes se pedía `populate=*`, que traía servicios, características,
 * testimonios, el doctor con su rich text, galería, videos y `pageTexts`
 * entero (medio centenar de cadenas por clínica). Como `menu-list` vive en el
 * navbar, eso viajaba en cada carga de cada página. Las vistas de detalle de
 * una clínica NO usan este hook: tienen su propio fetch por slug en servidor.
 *
 * El objeto devuelto es un subconjunto de `ClinicType`; el resto de campos
 * llega como `undefined`. Si una vista necesita uno, añádelo aquí.
 */
const CAMPOS = [
  "fields[0]=title",
  "fields[1]=slug",
  "fields[2]=icon",
  "fields[3]=featuredClinic",
  "fields[4]=heroSubtitle",
  "populate[heroImage][fields][0]=url",
].join("&");

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clinics?${CAMPOS}&pagination[pageSize]=100`;

const VACIO: ClinicType[] = [];

const parse = (json: unknown): ClinicType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as ClinicType[]) : VACIO;
};

export function useGetClinics(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { clinics: data, loading, error };
}
