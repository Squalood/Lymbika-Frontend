import { NextRequest, NextResponse } from "next/server";

import {
  exchangeGoogleToken,
  GOOGLE_AUTH_COOKIE_CONFIG,
} from "@/app/data/services/google-auth-service";

function getBaseUrl(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`;
  return request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const baseUrl = getBaseUrl(request);

  const providerError = searchParams.get("error");
  if (providerError) {
    console.error(
      `[google-auth] el proveedor devolvió un error: ${providerError}`,
      searchParams.get("error_description") ?? ""
    );
    return NextResponse.redirect(
      new URL(`/signin?error=${encodeURIComponent(providerError)}`, baseUrl)
    );
  }

  const accessToken =
    searchParams.get("access_token") ?? searchParams.get("id_token") ?? undefined;

  const result = await exchangeGoogleToken(accessToken);

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(`/signin?error=${result.reason}`, baseUrl)
    );
  }

  const response = NextResponse.redirect(new URL("/dashboard", baseUrl));
  response.cookies.set("jwt", result.jwt, GOOGLE_AUTH_COOKIE_CONFIG);
  return response;
}
