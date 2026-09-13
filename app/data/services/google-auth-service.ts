import { toAuthErrorCode, type AuthErrorCode } from "./auth-errors";

export type GoogleExchangeResult =
  | { ok: true; jwt: string }
  | { ok: false; reason: AuthErrorCode };

/**
 * Canjea el access_token que Strapi nos devuelve tras el consentimiento de
 * Google por un JWT de Strapi.
 */
export async function exchangeGoogleToken(
  accessToken: string | undefined
): Promise<GoogleExchangeResult> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!accessToken) return { ok: false, reason: "missing_token" };
  if (!backendUrl) return { ok: false, reason: "missing_config" };

  const url = `${backendUrl}/api/auth/google/callback?access_token=${encodeURIComponent(
    accessToken
  )}`;

  let response: Response;

  try {
    response = await fetch(url, { cache: "no-store" });
  } catch (error) {
    console.error("[google-auth] no se pudo contactar a Strapi:", error);
    return { ok: false, reason: "backend_unreachable" };
  }

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.jwt) {
    console.error(
      `[google-auth] Strapi respondió ${response.status}:`,
      JSON.stringify(body)
    );
    return {
      ok: false,
      reason: toAuthErrorCode(body?.error?.message ?? body?.message),
    };
  }

  return { ok: true, jwt: body.jwt };
}

export const GOOGLE_AUTH_COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  path: "/",
  httpOnly: true,
  secure:
    process.env.NODE_ENV === "production" && process.env.HOST !== "localhost",
} as const;
