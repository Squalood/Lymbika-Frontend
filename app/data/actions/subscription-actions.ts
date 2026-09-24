"use server";

import { getUserMeLoader } from "../services/get-user-me-loader";
import { mutateData } from "../services/mutate-data";

export type TipoPlan = "personal" | "familiar";

export type SuscripcionResult =
  | { url: string }
  | { redirectTo: string }
  | { error: string };

// Los Payment Links solo pueden vivir en estos dominios. El link lo pega un
// admin en Strapi; validarlo evita que un valor mal puesto —o mal
// intencionado— convierta el botón de suscribirse en un redirect a cualquier
// sitio con la marca de Lymbika encima.
const HOSTS_PERMITIDOS = new Set(["buy.stripe.com", "checkout.stripe.com"]);

/**
 * Resuelve el Payment Link de un plan y le pega la identidad del usuario.
 *
 * Recibe el id del plan, nunca la URL: el link se busca en el servidor. Sin
 * `client_reference_id` el webhook no tiene forma de saber a qué cuenta de
 * Strapi corresponde el pago, que es justo por lo que hoy las membresías se
 * activan a mano.
 */
export async function iniciarSuscripcion(
  membershipId: number,
  tipo: TipoPlan
): Promise<SuscripcionResult> {
  if (!Number.isInteger(membershipId) || membershipId <= 0) {
    return { error: "Ese plan no está disponible." };
  }

  // ── 1. Sesión ──────────────────────────────────────────────────────────────
  const sesion = await getUserMeLoader();
  if (!sesion.ok || !sesion.data?.id) {
    const destino = `/membership?plan=${membershipId}&tipo=${tipo}`;
    return { redirectTo: `/signin?callbackUrl=${encodeURIComponent(destino)}` };
  }
  const user = sesion.data;

  // ── 2. El link, desde Strapi ───────────────────────────────────────────────
  // Se filtra por id en el listado: en Strapi v5 la ruta /api/memberships/:id
  // espera un documentId, y lo que tiene el frontend es el id numérico.
  try {
    const url = new URL(
      `/api/memberships?filters[id][$eq]=${membershipId}&populate=button`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      console.error(`[iniciarSuscripcion] Strapi respondió ${res.status}`);
      return { error: "No pudimos cargar el plan. Intenta de nuevo." };
    }

    const json = await res.json();
    const plan = json?.data?.[0];
    if (!plan) return { error: "Ese plan ya no está disponible." };

    // Atajo de desarrollo: con DEV_PAYMENT_LINK en .env.local se prueba el flujo
    // con un Payment Link de prueba sin tener que editar el dato en Strapi.
    // El guard de NODE_ENV hace que no pueda aplicarse en producción ni por
    // accidente, aunque la variable llegue a estar definida allá.
    const linkDeDesarrollo =
      process.env.NODE_ENV !== "production" ? process.env.DEV_PAYMENT_LINK : undefined;

    if (linkDeDesarrollo) {
      console.warn(
        `[iniciarSuscripcion] usando DEV_PAYMENT_LINK en vez del link de Strapi (plan ${membershipId}, ${tipo})`
      );
    }

    const link =
      linkDeDesarrollo ?? (tipo === "familiar" ? plan.button?.linkF : plan.button?.linkP);
    if (!link) {
      console.error(
        `[iniciarSuscripcion] la membresía ${membershipId} no tiene link para el plan ${tipo}`
      );
      return { error: "Ese plan todavía no se puede contratar en línea." };
    }

    // ── 3. Identidad en el link ──────────────────────────────────────────────
    let destino: URL;
    try {
      destino = new URL(link);
    } catch {
      console.error(`[iniciarSuscripcion] link inválido en la membresía ${membershipId}`);
      return { error: "Ese plan todavía no se puede contratar en línea." };
    }

    if (destino.protocol !== "https:" || !HOSTS_PERMITIDOS.has(destino.hostname)) {
      console.error(
        `[iniciarSuscripcion] el link de la membresía ${membershipId} no es de Stripe: ${destino.hostname}`
      );
      return { error: "Ese plan todavía no se puede contratar en línea." };
    }

    // Lo que el webhook usa para saber de quién es el pago.
    destino.searchParams.set("client_reference_id", String(user.id));
    if (user.email) destino.searchParams.set("prefilled_email", user.email);

    return { url: destino.toString() };
  } catch (error) {
    console.error("[iniciarSuscripcion] fallo al resolver el plan:", error);
    return { error: "No pudimos iniciar la suscripción. Intenta de nuevo." };
  }
}

// ── Customer Portal ──────────────────────────────────────────────────────────

export type PortalResult = { url: string } | { error: string };

// El portal vive en otro dominio que los Payment Links.
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

    // Mismo criterio que iniciarSuscripcion: un redirect que sale del botón de
    // Lymbika se valida antes de devolverlo.
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
    // mutateData lanza si no hay cookie jwt.
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
