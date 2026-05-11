import { NextRequest, NextResponse } from "next/server";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("access_token") ?? searchParams.get("id_token");
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!accessToken || !backendUrl) {
    return NextResponse.redirect(new URL("/signin?error=google_auth_failed", request.url));
  }

  try {
    const res = await fetch(
      `${backendUrl}/api/auth/google/callback?access_token=${accessToken}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return NextResponse.redirect(new URL("/signin?error=google_auth_failed", request.url));
    }

    const data = await res.json();
    const jwt = data?.jwt;

    if (!jwt) {
      return NextResponse.redirect(new URL("/signin?error=google_auth_failed", request.url));
    }

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set("jwt", jwt, cookieConfig);
    return response;
  } catch {
    return NextResponse.redirect(new URL("/signin?error=google_auth_failed", request.url));
  }
}
