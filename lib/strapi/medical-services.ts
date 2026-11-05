import { ServiceType } from "@/types/service";
import { MedicalServiceType, MedicalServiceCatalogItem } from "@/types/medicalService";
import { agruparCatalogo, TarifaDeCatalogo } from "@/lib/medical-service-catalog";
import { strapiLista, strapiPrimero } from "./client";

/**
 * Servicio médico con todo lo que pinta su landing. generateMetadata y la
 * página la llaman con la misma URL: Next deduplica el fetch.
 */
export function getMedicalServiceBySlug(slug: string) {
  return strapiPrimero<MedicalServiceType>(
    `medical-services` +
      `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      `&populate[landingHero][populate][hero_video][fields][0]=url` +
      `&populate[landingHero][populate][hero_image][fields][0]=url` +
      `&populate[landingHero][populate][trust_pills][fields][0]=text` +
      `&populate[landingStat]=*` +
      `&populate[landingBenefit]=*` +
      `&populate[landing_video_url]=*` +
      `&populate[landing_gallery][fields][0]=url` +
      `&populate[faq_group][populate][faq]=*` +
      `&populate[landingTexts]=*` +
      `&populate[image][fields][0]=url` +
      `&populate[service_rates][populate][items][fields][0]=text` +
      `&populate[service_rates][populate][doctor][fields][0]=doctorName` +
      `&populate[service_rates][populate][doctor][fields][1]=slug` +
      `&populate[service_rates][populate][doctor][fields][2]=contactButton` +
      `&populate[service_rates][populate][doctor][populate][image][fields][0]=url` +
      `&populate[service_rates][populate][doctor][populate][bannerImage][fields][0]=url` +
      `&populate[service_rates][populate][doctor][populate][bannerImage][fields][1]=width` +
      `&populate[service_rates][populate][doctor][populate][bannerImage][fields][2]=height` +
      `&populate[service_rates][populate][doctor][populate][services][fields][0]=serviceName` +
      `&populate[hospitals][populate][imagen][fields][0]=url`,
    "medical-service"
  );
}

/**
 * Especialidad y su catálogo de servicios, con el precio más bajo de cada uno.
 * Ambas consultas filtran por la especialidad en Strapi; antes se bajaban
 * todas las especialidades y hasta 500 tarifas para quedarse con una.
 */
export async function getSpecialtyData(slug: string): Promise<{
  service: ServiceType | null;
  catalogItems: MedicalServiceCatalogItem[];
}> {
  const s = encodeURIComponent(slug);
  const [service, rates] = await Promise.all([
    strapiPrimero<ServiceType>(`services?filters[slug][$eq]=${s}&populate=*`, "specialty"),
    strapiLista<TarifaDeCatalogo>(
      `service-rates?filters[medical_service][specialty][slug][$eq]=${s}&populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=slug&populate[medical_service][fields][2]=type&populate[medical_service][fields][3]=description&populate[medical_service][populate][image][fields][0]=url&populate[medical_service][populate][specialty][fields][0]=slug&populate[items][fields][0]=text&pagination[pageSize]=500`,
      "specialty-rates"
    ),
  ]);

  return { service, catalogItems: agruparCatalogo(rates, slug) };
}
