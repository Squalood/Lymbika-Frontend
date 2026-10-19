/**
 * Single type site-config: constantes globales del sitio.
 * Cualquier campo vacío cae al valor de lib/constants.ts (ver lib/site-config.ts).
 */
export type SiteConfigType = {
  membershipName?: string | null
  /** Con lada de país; se aceptan espacios, guiones y paréntesis. */
  whatsappNumber?: string | null
  address?: string | null
  mapsUrl?: string | null
  instagramUrl?: string | null
  facebookUrl?: string | null
  tiktokUrl?: string | null
  /** Pesos por dólar. */
  exchangeRateUsd?: number | string | null
}
