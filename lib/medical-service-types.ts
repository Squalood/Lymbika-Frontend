import { MedicalServiceType } from "@/types/medical-service";
import { whatsappLink } from "@/lib/site-config";

export const TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consultas",
  procedure: "Procedimientos",
  study: "Estudios",
};

export const TYPE_ORDER: MedicalServiceType["type"][] = ["consultation", "procedure", "study"];

function getWhatsAppMessage({
  type,
  name,
  priceDisplay,
  doctorName,
}: {
  type: MedicalServiceType["type"];
  name: string;
  priceDisplay?: string | null;
  doctorName?: string | null;
}): string {
  const precio = priceDisplay ? ` (${priceDisplay.trim()})` : "";
  // Los nombres en Strapi vienen con espacios sobrantes, hay que limpiarlos
  // o el mensaje sale con doble espacio antes del punto final.
  const doctor = doctorName?.trim();
  const conDoctor = doctor ? ` con ${doctor}` : "";
  switch (type) {
    case "procedure":
      return `Hola, quiero agendar mi valoración para ${name}${precio}${conDoctor}. Me gustaría conocer las opciones de pago a meses y los siguientes pasos.`;
    case "consultation":
      return `Hola, quiero agendar una consulta de ${name}${precio}${conDoctor}.`;
    case "study":
      return `Hola, quiero información sobre el estudio ${name}${precio}.`;
    default:
      return `Hola, me interesa información sobre ${name}.`;
  }
}

/** Link de WhatsApp con un mensaje prellenado según el tipo de servicio. */
export function getWhatsAppUrl(
  whatsappNumber: string,
  opts: Parameters<typeof getWhatsAppMessage>[0]
): string {
  return whatsappLink(whatsappNumber, getWhatsAppMessage(opts));
}
