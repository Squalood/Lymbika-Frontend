import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" && process.env.HOST !== "localhost",
};

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ access_token?: string }>;
}) {
  const params = await searchParams;
  const accessToken = params.access_token;

  if (!accessToken) {
    redirect("/signin?error=google_auth_failed");
  }

  // Exchange Google access_token for Strapi JWT
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback?access_token=${accessToken}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    redirect("/signin?error=google_auth_failed");
  }

  const data = await res.json();
  const jwt = data?.jwt;

  if (!jwt) {
    redirect("/signin?error=google_auth_failed");
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", jwt, cookieConfig);

  redirect("/dashboard");
}
