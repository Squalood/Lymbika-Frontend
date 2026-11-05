import { FaqType } from "@/types/faq";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Un faq-group por slug, desde el servidor (las preguntas salen en el HTML).
 * Devuelve null si no existe o si Strapi falla: la página sigue sin el FAQ.
 */
export async function getFaqGroup(slug: string): Promise<FaqType | null> {
  try {
    const res = await fetch(
      `${BASE}/api/faq-groups?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[faq]=true`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      console.error("[faq-group] Strapi error:", res.status);
      return null;
    }
    const json = await res.json();
    return json.data?.[0] ?? null;
  } catch (err) {
    console.error("[faq-group] fetch failed:", err);
    return null;
  }
}
