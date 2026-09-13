"use server";

import { mutateData } from "../services/mutate-data";
import { AUTH_ERROR_MESSAGES } from "../services/auth-errors";

export interface CheckoutItem {
  id: number;
  quantity: number;
}

export type CheckoutResult = { url: string } | { error: string };

/**
 * Crea la sesión de pago en Strapi.
 *
 * El JWT vive en una cookie httpOnly, así que un componente cliente no puede
 * leerlo: la llamada tiene que salir del servidor. Solo viajan `id` y
 * `quantity` — el precio, el descuento de miembro y el costo de envío los
 * resuelve el backend contra Strapi y el usuario autenticado.
 */
export async function crearSesionDePago(
  items: CheckoutItem[],
  isDelivery: boolean
): Promise<CheckoutResult> {
  if (!items?.length) return { error: "Tu carrito está vacío." };

  const payload = {
    items: items.map(({ id, quantity }) => ({ id, quantity })),
    isDelivery: Boolean(isDelivery),
  };

  try {
    const res = await mutateData("POST", "/api/orders", payload);

    if (res?.error) {
      // 403: el token es válido pero el rol no tiene marcado Order.create en
      // Strapi. El mensaje del backend para ese caso es solo "Forbidden".
      if (res.error.status === 403) {
        return { error: AUTH_ERROR_MESSAGES.permissions_missing };
      }
      return { error: res.error.message || "No se pudo iniciar el pago." };
    }
    if (!res?.url) {
      return { error: "Respuesta inválida del servidor de pagos." };
    }

    return { url: res.url };
  } catch {
    // mutateData lanza si no hay cookie jwt. El texto es a propósito distinto
    // del que devuelve el controlador de Strapi para el mismo caso, para poder
    // distinguir en qué lado se cortó.
    return { error: "Tu sesión no está activa. Inicia sesión y vuelve a intentarlo." };
  }
}
