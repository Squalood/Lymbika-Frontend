/**
 * Utilidades de /dashboard/operations: fechas en hora de Juárez y enlaces de WhatsApp.
 *
 * El `<input type="datetime-local">` no tiene zona horaria. Se interpreta
 * siempre en hora de Ciudad Juárez (la de la clínica y la de lib/formatDate),
 * no en la del navegador ni la del servidor (UTC): así lo que escribe el
 * coordinador es lo mismo que luego ve el paciente, y el servidor y el cliente
 * pintan el mismo valor inicial.
 */

const ZONAS = ["America/Ciudad_Juarez", "America/Mexico_City"];

function partesEnZona(fecha: Date) {
  for (const timeZone of ZONAS) {
    try {
      const formato = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      return Object.fromEntries(
        formato.formatToParts(fecha).map((p) => [p.type, p.value])
      ) as Record<string, string>;
    } catch {
      // tzdata vieja sin Ciudad_Juarez: se intenta la siguiente zona.
    }
  }
  throw new Error("Sin zona horaria disponible");
}

/** ISO de Strapi → "2026-10-06T09:30" para el input. */
export function isoAInputLocal(iso: string | null | undefined): string {
  if (!iso) return "";
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return "";
  const p = partesEnZona(fecha);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

/** "2026-10-06T09:30" (hora de Juárez) → ISO en UTC para Strapi. */
export function inputLocalAIso(valor: string): string | null {
  if (!valor) return null;
  const comoUtc = new Date(`${valor}:00Z`);
  if (Number.isNaN(comoUtc.getTime())) return null;
  const p = partesEnZona(comoUtc);
  const mismoRelojEnUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  const desfase = mismoRelojEnUtc - comoUtc.getTime();
  return new Date(comoUtc.getTime() - desfase).toISOString();
}

/** "hace 5 min", "hace 3 h", "hace 2 días". Solo para componentes de servidor. */
export function haceCuanto(iso: string): string {
  const minutos = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutos < 1) return "ahora";
  if (minutos < 60) return `hace ${minutos} min`;
  const horas = Math.round(minutos / 60);
  if (horas < 24) return `hace ${horas} h`;
  const dias = Math.round(horas / 24);
  return dias === 1 ? "hace 1 día" : `hace ${dias} días`;
}

/** wa.me necesita el número con lada de país; los de 10 dígitos son de México. */
export function enlaceWhatsApp(telefono: string, texto?: string) {
  const digitos = telefono.replace(/\D/g, "");
  const numero = digitos.length === 10 ? `52${digitos}` : digitos;
  return `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}
