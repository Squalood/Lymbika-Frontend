"use client";

import { CategoryType } from "@/types/category";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;

const VACIO: CategoryType[] = [];

const parse = (json: unknown): CategoryType[] => {
  const data = (json as { data?: unknown })?.data;
  return Array.isArray(data) ? (data as CategoryType[]) : VACIO;
};

export function useGetCategories(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { loading, result: data, error };
}
