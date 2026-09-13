import { sessionErrorMessage } from "@/app/data/services/auth-errors";

/**
 * Aviso global cuando hay sesión iniciada pero Strapi rechaza al usuario.
 *
 * `getUserMeLoader` devuelve `error: null` cuando simplemente no hay cookie, así
 * que un visitante anónimo nunca ve esto: solo aparece si el usuario entró y aun
 * así el backend lo rechaza, que es el caso que de otro modo se manifiesta como
 * una página en blanco sin explicación.
 */
export function SessionErrorBanner({ error }: { readonly error: unknown }) {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="w-full bg-pink-50 px-4 py-3 text-center text-sm text-pink-800 border-b border-pink-300"
    >
      {sessionErrorMessage(error)}
    </div>
  );
}
