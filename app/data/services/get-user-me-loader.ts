import { getAuthToken } from "./get-token";
import type { UserType } from "@/types/user";

type UserMeResult =
  | { ok: true; data: UserType; error: null }
  | { ok: false; data: null; error: unknown };

export async function getUserMeLoader(): Promise<UserMeResult> {
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

  const url = new URL("/api/users/me", baseUrl);

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      // Los datos de sesión no se cachean nunca. Importa además para el
      // sincronizador de la vuelta del portal, que consulta en bucle hasta ver
      // el cambio que escribió el webhook.
      cache: "no-store",
    });
    const data = await response.json();
    if (data.error) {
      // Esta llamada corre en el servidor, así que no aparece en el Network del
      // navegador: sin este log un 401/403 de Strapi es invisible.
      console.error(
        `[users-me] Strapi respondió ${response.status}:`,
        JSON.stringify(data.error)
      );
      return { ok: false, data: null, error: data.error };
    }
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error("[users-me] no se pudo contactar a Strapi:", error);
    return { ok: false, data: null, error: error };
  }
}