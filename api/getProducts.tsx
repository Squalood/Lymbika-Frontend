"use client";

import { ProductType } from "@/types/product";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";
import { camposDeProducto } from "@/lib/product-fields";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[active][$eq]=true&${camposDeProducto()}&pagination[page]=1&pagination[pageSize]=5000`;

const VACIO: ProductType[] = [];

const parse = (json: unknown): ProductType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as ProductType[]) : VACIO;
};

export function useGetProducts(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { loading, products: data, error };
}
