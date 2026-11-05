/**
 * Fecha larga en español, con la zona horaria fijada.
 *
 * El `timeZone` explícito no es un detalle: el servidor corre en UTC y el
 * usuario está en UTC-6/-7. Sin fijarlo, un periodo que termina cerca de
 * medianoche se muestra con un día de diferencia según quién renderice.
 *
 * Se usa Ciudad Juárez porque ahí está la farmacia. Esa zona sigue el horario
 * de verano de Estados Unidos, así que en invierno va una hora detrás de CDMX;
 * en verano coinciden.
 */

const ZONA = "America/Ciudad_Juarez";
// `America/Ciudad_Juarez` solo existe en tzdata 2022g en adelante. Si el
// runtime de despliegue fuera más viejo, Intl lanza y caemos a la zona
// nacional en vez de romper la página por una fecha.
const ZONA_RESPALDO = "America/Mexico_City";

const OPCIONES: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

/** Devuelve `null` ante una fecha ausente o inválida: nunca pintar "Invalid Date". */
export function formatLongDate(iso: string | null | undefined): string | null {
  if (!iso) return null;

  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return null;

  try {
    return fecha.toLocaleDateString("es-MX", { ...OPCIONES, timeZone: ZONA });
  } catch {
    return fecha.toLocaleDateString("es-MX", { ...OPCIONES, timeZone: ZONA_RESPALDO });
  }
}
