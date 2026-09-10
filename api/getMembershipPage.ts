import { MembershipPageType } from "@/types/single-types/membership-page";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Un populate a un campo que no existe en Strapi devuelve 400 con data: null y
 * la página se queda vacía sin error visible, así que cada línea debe existir
 * en el single type membership-page.
 */
const QUERY = [
  "populate[badge]=true",
  "populate[texts]=true",
  "populate[memberships][populate][button]=true",
  "populate[memberships][populate][features]=true",
  "populate[faq_group][populate][faq]=true",
].join("&");

export async function getMembershipPage(): Promise<MembershipPageType | null> {
  try {
    const res = await fetch(
      `${BASE}/api/membership-page?${QUERY}`,
      { next: { revalidate: 3600 } }
    );
    // 404 = el single type todavía no existe en Strapi; no es un error de query.
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error("[membership-page] Strapi error:", res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("[membership-page] fetch failed:", err);
    return null;
  }
}
