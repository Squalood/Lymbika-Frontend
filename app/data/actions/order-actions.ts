"use server";

import { getAuthToken } from "../services/get-token";

export type EstadoOrden = "pending" | "paid" | "failed";

export interface OrdenResumen {
  estado: EstadoOrden;
  total: number;
  isDelivery: boolean;
  products: {
    id: number | null;
    name: string;
    quantity: number;
    unit_amount: number;
  }[];
}

export type ConsultaOrden =
  | { orden: OrdenResumen }
  | { error: "no_encontrada" | "sin_sesion" | "fallo" };

/**
 * Consulta el estado real de la orden que corresponde a una sesión de Stripe.
 *
 * El backend solo devuelve la orden si pertenece al usuario del token, así que
 * no hace falta comprobar nada aquí. Se usa desde /success para dejar de dar
 * las gracias a ciegas: hasta que el webhook confirme el cobro, el estado
 * sigue siendo `pending`.
 */
export async function consultarOrden(sessionId: string): Promise<ConsultaOrden> {
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return { error: "no_encontrada" };
  }

  const token = await getAuthToken();
  if (!token) return { error: "sin_sesion" };

  try {
    const url = new URL(
      `/api/orders/by-session/${encodeURIComponent(sessionId)}`,
      process.env.NEXT_PUBLIC_BACKEND_URL
    );

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      // El estado cambia cuando llega el webhook: nunca cachear.
      cache: "no-store",
    });

    if (res.status === 401) return { error: "sin_sesion" };
    if (res.status === 404) return { error: "no_encontrada" };
    if (!res.ok) {
      console.error(`[consultarOrden] Strapi respondió ${res.status}`);
      return { error: "fallo" };
    }

    return { orden: (await res.json()) as OrdenResumen };
  } catch (error) {
    console.error("[consultarOrden] no se pudo consultar la orden:", error);
    return { error: "fallo" };
  }
}
