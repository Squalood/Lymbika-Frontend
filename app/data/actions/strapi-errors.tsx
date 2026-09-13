import { AuthErrorMessage } from "@/components/auth/auth-error-message";

export interface StrapiErrorsProps {
  message: string;
  name?: string;
  status?: number;
}

export function StrapiErrors({
  error,
}: {
  readonly error?: StrapiErrorsProps | null;
}) {
  if (!error?.message) return null;
  return <AuthErrorMessage>{error.message}</AuthErrorMessage>;
}
