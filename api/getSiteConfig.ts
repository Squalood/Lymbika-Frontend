import { resolverSiteConfig, SiteConfig } from "@/lib/site-config";
import { SiteConfigType } from "@/types/single-types/site-config";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Siempre devuelve una configuración completa: si Strapi falla, el single type
 * no existe todavía (404) o un campo viene vacío, se usan los defaults.
 *
 * La pide el layout y la reparte a los client components con SiteConfigProvider.
 * Un server component puede llamarla directo: Next deduplica el fetch.
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  return resolverSiteConfig(await getSiteConfigRaw());
}

async function getSiteConfigRaw(): Promise<SiteConfigType | null> {
  try {
    const res = await fetch(`${BASE}/api/site-config`, { next: { revalidate: 3600 } });
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error("[site-config] Strapi error:", res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("[site-config] fetch failed:", err);
    return null;
  }
}
