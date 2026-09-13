import {
  handleGoogleCallback,
  type GoogleCallbackSearchParams,
} from "@/components/auth/google-callback";

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: Promise<GoogleCallbackSearchParams>;
}) {
  return handleGoogleCallback(searchParams);
}
