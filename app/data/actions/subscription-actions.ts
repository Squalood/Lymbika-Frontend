"use server";

import { getUserMeLoader } from "../services/get-user-me-loader";
import { mutateData } from "../services/mutate-data";
import { AUTH_ERROR_MESSAGES } from "../services/auth-errors";

export type TipoPlan = "personal" | "familiar";

export type SuscripcionResult =
  | { url: string }
  | { redirectTo: string }
  | { error: string };

// El checkout de Stripe vive aquí; el portal, en otro dominio.
const HOSTS_CHECKOUT = new Set(["checkout.stripe.com"]);

/** Códigos que devuelve el backend al rechazar un checkout. */
const MENSAJES_CHECKOUT: Record<string, string> = {
  suscripcion_activa:
    "Ya tienes una suscripción activa. Puedes administrarla desde tu cuenta.",
  plan_sin_precio: "Ese plan todavía no se puede contratar en línea.",
  plan_mal_configurado:
    "Ese plan no está bien configurado. Avísanos y lo revisamos.",
};

/**
 * Arranca la contratación de un plan.
 *
 * Solo manda el id del plan y el tipo: el precio lo resuelve el backend contra
 * Strapi y crea la sesión de Stripe. Antes esto abría un Payment Link que un
 * admin pegaba a mano, sin forma de impedir que alguien se suscribiera dos
 * veces ni de garantizar que el precio anunciado fuera el que se cobra.
 */
export async function iniciarSuscripcion(
  membershipId: string,
  tipo: TipoPlan
): Promise<SuscripcionResult> {
  // Es el `documentId` de Strapi v5, no el id numerico: ese cambia cada vez
  // que se republica el plan, y el frontend cachea una hora — con el numerico,
  // editar un plan en el admin rompia el boton hasta que caducara la cache.
  if (typeof membershipId !== "string" || !membershipId.trim()) {
    return { error: "Ese plan no está disponible." };
  }

  // Se comprueba la sesión antes de llamar al backend para poder mandar al
  // login conservando el plan elegido, en vez de devolver un 401 seco.
  const sesion = await getUserMeLoader();
  if (!sesion.ok || !sesion.data?.id) {
    const destino = `/membership?plan=${membershipId}&tipo=${tipo}`;
    return { redirectTo: `/signin?callbackUrl=${encodeURIComponent(destino)}` };
  }

  try {
    const res = await mutateData("POST", "/api/subscription/checkout", {
      membershipId,
      tipo,
    });

    if (res?.error) {
      const { status, message, details } = res.error;

      const codigo = details?.code as string | undefined;
      if (codigo && MENSAJES_CHECKOUT[codigo]) {
        return { error: MENSAJES_CHECKOUT[codigo] };
      }
      // 403 sin código: el rol no tiene marcado Subscription.checkout.
      if (status === 403) return { error: AUTH_ERROR_MESSAGES.permissions_missing };

      return { error: message || "No pudimos iniciar la suscripción." };
    }

    if (!res?.url) return { error: "Respuesta inválida del servidor de pagos." };

    // Mismo criterio que el portal: un redirect que sale de un botón de
    // Lymbika se valida antes de devolverlo.
    let destino: URL;
    try {
      destino = new URL(res.url);
    } catch {
      console.error("[iniciarSuscripcion] el backend devolvió una URL inválida");
      return { error: "No pudimos iniciar la suscripción." };
    }

    if (destino.protocol !== "https:" || !HOSTS_CHECKOUT.has(destino.hostname)) {
      console.error(`[iniciarSuscripcion] el destino no es de Stripe: ${destino.hostname}`);
      return { error: "No pudimos iniciar la suscripción." };
    }

    return { url: destino.toString() };
  } catch {
    // mutateData lanza si no hay cookie jwt.
    return { error: "Tu sesión no está activa. Inicia sesión y vuelve a intentarlo." };
  }
}

// ── Customer Portal ──────────────────────────────────────────────────────────

export type PortalResult = { url: string } | { error: string };

const HOSTS_PORTAL = new Set(["billing.stripe.com"]);

/** Códigos que devuelve el backend cuando no hay portal que abrir. */
const MENSAJES_PORTAL: Record<string, string> = {
  membresia_manual:
    "Tu membresía la administra el equipo de Lymbika. Escríbenos por WhatsApp para cualquier cambio.",
  sin_suscripcion:
    "Todavía no hay una suscripción ligada a tu cuenta. Si crees que es un error, escríbenos.",
};

/**
 * Pide al backend una sesión firmada del Customer Portal.
 *
 * Reemplaza al link genérico que estaba escrito a mano en memberInfo.tsx: ese
 * le pedía el correo al usuario y le mandaba un código, y no servía si había
 * pagado con un correo distinto al de su cuenta.
 */
export async function abrirPortalDeFacturacion(): Promise<PortalResult> {
  try {
    const res = await mutateData("POST", "/api/subscription/portal");

    if (res?.error) {
      const { status, message, details } = res.error;

      if (status === 401) {
        return { error: "Tu sesión expiró. Vuelve a iniciar sesión." };
      }

      // 403 y 404 son los dos casos de "no hay customer", y el backend los
      // distingue con un código para poder decir algo útil en vez de "Forbidden".
      const codigo = details?.code as string | undefined;
      if (codigo && MENSAJES_PORTAL[codigo]) {
        return { error: MENSAJES_PORTAL[codigo] };
      }
      if (status === 403) return { error: MENSAJES_PORTAL.membresia_manual };
      if (status === 404) return { error: MENSAJES_PORTAL.sin_suscripcion };

      console.error(`[portal] Strapi respondió ${status}: ${message}`);
      return { error: "No pudimos abrir la administración de tu suscripción." };
    }

    if (!res?.url) return { error: "Respuesta inválida del servidor de pagos." };

    let destino: URL;
    try {
      destino = new URL(res.url);
    } catch {
      console.error("[portal] el backend devolvió una URL inválida");
      return { error: "No pudimos abrir la administración de tu suscripción." };
    }

    if (destino.protocol !== "https:" || !HOSTS_PORTAL.has(destino.hostname)) {
      console.error(`[portal] el destino no es de Stripe: ${destino.hostname}`);
      return { error: "No pudimos abrir la administración de tu suscripción." };
    }

    return { url: destino.toString() };
  } catch {
    return { error: "Tu sesión no está activa. Inicia sesión y vuelve a intentarlo." };
  }
}

/**
 * Huella del estado de membresía, para detectar que el webhook ya aterrizó.
 *
 * Al volver del portal, Stripe devuelve al usuario de inmediato pero el evento
 * tarda un par de segundos. Comparar esta firma contra la que tenía la página
 * al renderizarse es lo que permite esperar sin mentirle.
 */
export async function leerFirmaDeMembresia(): Promise<string | null> {
  const sesion = await getUserMeLoader();
  if (!sesion.ok || !sesion.data) return null;

  const u = sesion.data;
  return [
    u.membershipActive,
    u.subscriptionStatus,
    u.subscriptionCancelAtPeriodEnd,
    u.subscriptionCurrentPeriodEnd,
  ].join("|");
}
