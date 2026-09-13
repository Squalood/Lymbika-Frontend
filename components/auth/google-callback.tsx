import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  exchangeGoogleToken,
  GOOGLE_AUTH_COOKIE_CONFIG,
} from "@/app/data/services/google-auth-service";

export type GoogleCallbackSearchParams = {
  access_token?: string;
  id_token?: string;
  error?: string;
  error_description?: string;
};

/**
 * Handler compartido por las rutas de callback de Google.
 *
 * Strapi redirige aquí tras el consentimiento; la ruta exacta la define el campo
 * "The redirect URL to your front-end app" del provider de Google en el panel de
 * Strapi, por eso hay varias rutas montadas sobre este mismo handler.
 */
export async function handleGoogleCallback(
  searchParams: Promise<GoogleCallbackSearchParams>
): Promise<never> {
  const params = await searchParams;

  // Google/Strapi pueden rebotar con su propio error antes de emitir un token.
  if (params.error) {
    console.error(
      `[google-auth] el proveedor devolvió un error: ${params.error}`,
      params.error_description ?? ""
    );
    redirect(`/signin?error=${encodeURIComponent(params.error)}`);
  }

  const result = await exchangeGoogleToken(params.access_token ?? params.id_token);

  if (!result.ok) {
    redirect(`/signin?error=${result.reason}`);
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", result.jwt, GOOGLE_AUTH_COOKIE_CONFIG);

  redirect("/dashboard");
}
