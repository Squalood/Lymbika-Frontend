"use client";

import { ProductType } from "@/types/product";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";
import { camposDeProducto } from "@/lib/product-fields";

const CAMPOS = camposDeProducto();

const VACIO: ProductType[] = [];

const parse = (json: unknown): ProductType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as ProductType[]) : VACIO;
};

export function useGetClinicsProducts(slug: string, options?: ResourceOptions) {
  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[active][$eq]=true&filters[clinics][slug][$eq]=${encodeURIComponent(slug)}&${CAMPOS}`;
  const { data, loading, error } = useSharedResource(endpoint, parse, VACIO, options);
  return { loading, result: data, error };
}
