"use server";

import { getUserMeLoader } from "../services/get-user-me-loader";

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

    const link = tipo === "familiar" ? plan.button?.linkF : plan.button?.linkP;
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
