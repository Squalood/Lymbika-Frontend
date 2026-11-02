import { SchedulesPageType } from "@/types/single-types/schedules-page";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Un populate a un campo que no existe en Strapi devuelve 400 con data: null y
 * la página cae entera a los defaults sin error visible, así que cada línea
 * debe existir en el single type schedules-page.
 */
const QUERY = [
  "populate[logo][fields][0]=url",
  "populate[doctors][fields][0]=doctorName",
  "populate[doctors][fields][1]=slug",
  "populate[doctors][fields][2]=credentials",
  "populate[doctors][fields][3]=calendarLink",
  "populate[doctors][fields][4]=priceCon",
  "populate[doctors][populate][mainImage][fields][0]=url",
  "populate[doctors][populate][image][fields][0]=url",
  "populate[benefits]=true",
  "populate[includes]=true",
  "populate[tip]=true",
  "populate[prices]=true",
  "populate[reasons]=true",
  "populate[steps]=true",
  "populate[contact][populate][image][fields][0]=url",
].join("&");

export async function getSchedulesPage(): Promise<SchedulesPageType | null> {
  try {
    const res = await fetch(
      `${BASE}/api/schedules-page?${QUERY}`,
      // TEMPORAL para probar en local: regresar a { next: { revalidate: 3600 } } antes del commit.
      { cache: "no-store" }
    );
    // 404 = el single type todavía no existe en Strapi; no es un error de query.
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error("[schedules-page] Strapi error:", res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("[schedules-page] fetch failed:", err);
    return null;
  }
}
