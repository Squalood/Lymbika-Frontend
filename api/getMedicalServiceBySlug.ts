import { MedicalServiceType } from "@/types/medicalService";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Servicio médico con todo lo que pinta su landing. Se pide en el servidor
 * para que Google y las vistas previas de WhatsApp/Facebook reciban la página
 * completa con su título y descripción, no un spinner.
 *
 * generateMetadata y la página la llaman con la misma URL: Next deduplica
 * el fetch. Devuelve null si no existe o si Strapi falla.
 */
export async function getMedicalServiceBySlug(slug: string): Promise<MedicalServiceType | null> {
  try {
    const res = await fetch(
      `${BASE}/api/medical-services` +
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
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.error("[medical-service] Strapi error:", res.status);
      return null;
    }
    const json = await res.json();
    return Array.isArray(json.data) && json.data.length > 0 ? json.data[0] : null;
  } catch (err) {
    console.error("[medical-service] fetch failed:", err);
    return null;
  }
}
