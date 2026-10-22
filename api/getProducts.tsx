"use client";

import { ProductType } from "@/types/product";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

/**
 * Campos mínimos para buscar un producto y pintarlo en una tarjeta o el carrito.
 *
 * Antes se pedía `populate=*`, que para los ~3.000 productos activos arrastraba
 * `descriptionPro` (rich text), reseñas, lotes de inventario, stock por farmacia
 * y los metadatos completos de cada imagen: 0,79 MB comprimidos por llamada, el
 * grueso del ancho de banda de Render. Si una vista nueva necesita otro campo,
 * añádelo a esta lista; no vuelvas a `populate=*`.
 */
const CAMPOS = [
  "fields[0]=productName",
  "fields[1]=slug",
  "fields[2]=sal",
  "fields[3]=price",
  "fields[4]=priceMember",
  "fields[5]=conReceta",
  "fields[6]=active",
  "populate[images][fields][0]=url",
  "populate[category][fields][0]=categoryName",
  "populate[category][fields][1]=slug",
].join("&");

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[active][$eq]=true&${CAMPOS}&pagination[page]=1&pagination[pageSize]=5000`;

const VACIO: ProductType[] = [];

const parse = (json: unknown): ProductType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as ProductType[]) : VACIO;
};

export function useGetProducts(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { loading, products: data, error };
}
