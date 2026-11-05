"use client";

import { MedicalServiceType } from "@/types/medical-service";
import { ResourceOptions, useSharedResource } from "@/lib/client-resource";

/**
 * Misma forma que MedicalServiceCatalogItem (ver useGetMedicalServiceCatalog)
 * para poder alimentar MedicalServiceCard sin adaptadores, más el orden
 * comercial que decide la posición en el menú.
 */
export type FeaturedSurgeryType = {
  service: MedicalServiceType;
  minPrice: number;
  packageItems: string[] | null;
  comercialidad: number | null;
};

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service-rates?filters[destacado][$eq]=true&filters[requiereCirugia][$eq]=true&filters[medical_service][has_landing_page][$eq]=true&fields[0]=comercialidad&fields[1]=price&fields[2]=package_items&populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=slug&populate[medical_service][fields][2]=description&populate[medical_service][fields][3]=type&populate[medical_service][populate][image][fields][0]=url&populate[medical_service][populate][specialty][fields][0]=slug&pagination[pageSize]=100`;

const VACIO: FeaturedSurgeryType[] = [];

const parse = (json: unknown): FeaturedSurgeryType[] => {
  const data = (json as { data?: unknown })?.data;
  if (!Array.isArray(data)) return VACIO;

  // Una cirugía puede tener tarifa en varias clínicas. Agrupamos por
  // medical_service y nos quedamos con el precio más bajo (y el paquete
  // de esa tarifa) más la comercialidad más alta (número más bajo).
  const map = new Map<string, FeaturedSurgeryType>();
  for (const rate of data) {
    const ms = rate.medical_service;
    // Sin especialidad no hay URL que construir:
    // /specialty/[specialtySlug]/[medicalServiceSlug]
    if (!ms?.slug || !ms.specialty?.slug) continue;

    const service: MedicalServiceType = {
      ...ms,
      name: (ms.name ?? "").trim(),
      description: (ms.description ?? "").trim(),
    };

    const existing = map.get(ms.slug);
    if (!existing) {
      map.set(ms.slug, {
        service,
        minPrice: rate.price,
        packageItems: rate.package_items ?? null,
        comercialidad: rate.comercialidad ?? null,
      });
      continue;
    }

    if (rate.price < existing.minPrice) {
      existing.minPrice = rate.price;
      existing.packageItems = rate.package_items ?? null;
    }
    if (
      rate.comercialidad != null &&
      (existing.comercialidad === null ||
        rate.comercialidad < existing.comercialidad)
    ) {
      existing.comercialidad = rate.comercialidad;
    }
  }

  // comercialidad solo ordena (1 = más arriba). Las que no la tengan van
  // al final en orden alfabético, para que no desaparezcan del menú si en
  // Strapi marcan destacado + requiereCirugia y se les olvida el orden.
  return Array.from(map.values()).sort((a, b) => {
    if (a.comercialidad !== b.comercialidad) {
      if (a.comercialidad === null) return 1;
      if (b.comercialidad === null) return -1;
      return a.comercialidad - b.comercialidad;
    }
    return a.service.name.localeCompare(b.service.name, "es");
  });
};

export function useGetFeaturedSurgeries(options?: ResourceOptions) {
  const { data, loading, error } = useSharedResource(ENDPOINT, parse, VACIO, options);
  return { surgeries: data, loading, error };
}
