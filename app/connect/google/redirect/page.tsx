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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!accessToken || !backendUrl) {
    redirect("/signin?error=google_auth_failed");
  }

  let jwt: string | null = null;

  try {
    const res = await fetch(
      `${backendUrl}/api/auth/google/callback?access_token=${accessToken}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();
      jwt = data?.jwt ?? null;
    }
  } catch {
    // fetch failed, jwt stays null
  }

  if (!jwt) {
    redirect("/signin?error=google_auth_failed");
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", jwt, cookieConfig);

  redirect("/dashboard");
}
