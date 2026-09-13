import { AUTH_ERROR_MESSAGES, type AuthErrorCode } from "@/app/data/services/auth-errors";

export function AuthErrorMessage({
  error,
  children,
}: {
  readonly error?: string;
  readonly children?: React.ReactNode;
}) {
  if (!error && !children) return null;

  const message =
    children ??
    AUTH_ERROR_MESSAGES[error as AuthErrorCode] ??
    AUTH_ERROR_MESSAGES.unknown;

  return (
    <div
      role="alert"
      className="rounded-md border border-pink-300 bg-pink-50 px-4 py-3 text-sm text-pink-700"
    >
      {message}
    </div>
  );
}
