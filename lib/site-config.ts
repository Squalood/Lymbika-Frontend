import {
  ADDRESS,
  EXCHANGE_RATE_USD,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MAPS_URL,
  MEMBERSHIP_NAME,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import { clean } from "@/lib/utils";
import { SiteConfigType } from "@/types/single-types/site-config";

/**
 * Constantes globales ya resueltas: lo que viene del single type site-config,
 * campo por campo, con lib/constants.ts como respaldo. Nunca tiene huecos, así
 * que quien la usa no tiene que comprobar nada.
 */
export type SiteConfig = {
  membershipName: string;
  /** Sólo dígitos, con lada de país. */
  whatsappNumber: string;
  address: string;
  mapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  exchangeRateUsd: number;
};

export const SITE_CONFIG_DEFAULTS: SiteConfig = {
  membershipName: MEMBERSHIP_NAME,
  whatsappNumber: WHATSAPP_NUMBER,
  address: ADDRESS,
  mapsUrl: MAPS_URL,
  instagramUrl: INSTAGRAM_URL,
  facebookUrl: FACEBOOK_URL,
  tiktokUrl: TIKTOK_URL,
  exchangeRateUsd: EXCHANGE_RATE_USD,
};

/** 10 dígitos → con lada 52; cualquier otro formato se respeta. */
function telefonoConLada(valor?: string | null) {
  const digitos = valor?.replace(/\D/g, "") ?? "";
  if (!digitos) return undefined;
  return digitos.length === 10 ? `52${digitos}` : digitos;
}

/** Postgres puede devolver el decimal como string; un valor inválido cae al default. */
function tipoDeCambio(valor?: number | string | null) {
  const numero = Number(valor);
  return valor != null && Number.isFinite(numero) && numero > 0 ? numero : undefined;
}

export function resolverSiteConfig(raw: SiteConfigType | null): SiteConfig {
  const d = SITE_CONFIG_DEFAULTS;
  if (!raw) return d;

  return {
    membershipName: clean(raw.membershipName) ?? d.membershipName,
    whatsappNumber: telefonoConLada(raw.whatsappNumber) ?? d.whatsappNumber,
    address: clean(raw.address) ?? d.address,
    mapsUrl: clean(raw.mapsUrl) ?? d.mapsUrl,
    instagramUrl: clean(raw.instagramUrl) ?? d.instagramUrl,
    facebookUrl: clean(raw.facebookUrl) ?? d.facebookUrl,
    tiktokUrl: clean(raw.tiktokUrl) ?? d.tiktokUrl,
    exchangeRateUsd: tipoDeCambio(raw.exchangeRateUsd) ?? d.exchangeRateUsd,
  };
}

/* ===== Derivados: no se guardan en Strapi para que no se desincronicen ===== */

/** Link de wa.me, con mensaje prellenado si se pasa `texto`. */
export function whatsappLink(numero: string, texto?: string) {
  return `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}

/** "526561100446" → "+52 (656) 110 0446". Otro largo se muestra tal cual. */
export function telefonoVisible(numero: string) {
  return numero.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})$/, "+$1 ($2) $3 $4");
}
