/**
 * Catálogo único de errores de autenticación.
 *
 * Strapi (@strapi/plugin-users-permissions) responde siempre en inglés y con
 * mensajes pensados para desarrolladores. Aquí los normalizamos a un código
 * estable y les damos un texto en español orientado al usuario.
 */
export type AuthErrorCode =
  | "invalid_credentials"
  | "permissions_missing"
  | "email_taken"
  | "not_confirmed"
  | "blocked"
  | "register_disabled"
  | "provider_disabled"
  | "missing_token"
  | "missing_config"
  | "backend_unreachable"
  | "access_denied"
  | "unknown";

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  invalid_credentials: "Usuario o contraseña incorrectos.",
  permissions_missing:
    "Esta cuenta no tiene los permisos necesarios para usar el sitio. " +
    "Avisa al equipo de Lymbika indicando tu correo.",
  email_taken:
    "Ya existe una cuenta con ese correo creada con contraseña. Inicia sesión con tu correo y contraseña.",
  not_confirmed:
    "Tu correo todavía no está confirmado. Revisa tu bandeja de entrada.",
  blocked: "Tu cuenta está bloqueada. Escríbenos para reactivarla.",
  register_disabled:
    "El registro de cuentas nuevas está deshabilitado por el momento.",
  provider_disabled: "El acceso con Google está deshabilitado por el momento.",
  missing_token: "No recibimos la respuesta de Google. Vuelve a intentarlo.",
  missing_config:
    "Falta configuración en el servidor. Avisa al equipo de Lymbika.",
  backend_unreachable:
    "No pudimos contactar al servidor. Inténtalo de nuevo en unos segundos.",
  access_denied: "Cancelaste el acceso con Google.",
  unknown: "No pudimos iniciar sesión. Vuelve a intentarlo.",
};

/** Traduce el mensaje crudo de Strapi a un código del catálogo. */
export function toAuthErrorCode(message: string | undefined): AuthErrorCode {
  const m = (message ?? "").toLowerCase();

  if (m.includes("invalid identifier or password")) return "invalid_credentials";
  if (m.includes("email is already taken")) return "email_taken";
  if (m.includes("not confirmed")) return "not_confirmed";
  if (m.includes("blocked")) return "blocked";
  if (m.includes("register action is currently disabled")) return "register_disabled";
  if (m.includes("provider is disabled")) return "provider_disabled";

  return "unknown";
}

/** Atajo: del mensaje crudo de Strapi al texto que ve el usuario. */
export function translateAuthError(message: string | undefined): string {
  return AUTH_ERROR_MESSAGES[toAuthErrorCode(message)];
}

/**
 * Traduce una respuesta fallida de Strapi a un mensaje para el usuario.
 *
 * El 403 merece mensaje propio: significa que el token es válido pero el rol
 * del usuario no tiene marcado el permiso en el panel de Strapi. Sin esto el
 * síntoma es una pantalla vacía o un crash, y no hay forma de saber por qué.
 */
export function sessionErrorMessage(error: unknown): string {
  const status = (error as { status?: number } | null)?.status;

  if (status === 403) return AUTH_ERROR_MESSAGES.permissions_missing;
  if (status === 401) return "Tu sesión expiró. Vuelve a iniciar sesión.";

  return "No pudimos cargar tu sesión. Inténtalo de nuevo en unos segundos.";
}
