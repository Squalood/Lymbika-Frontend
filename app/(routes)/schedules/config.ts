import { WHATSAPP_NUMBER } from "@/lib/constants";

/**
 * Datos de la sucursal. Para otro punto Farmacia+ sólo se edita este bloque.
 *
 * El teléfono y el WhatsApp son el número general de Lymbika (WHATSAPP_NUMBER),
 * que ya trae la lada 52.
 */
export const SUCURSAL = {
  nombre: "Farmacia+ Paseo de la Victoria",
  ciudad: "Ciudad Juárez",
  estado: "Chihuahua",
  direccion: "Av. Paseo de la Victoria 9350, Ciudad Juárez, Chih.",
  referencias: "", // ej. "Frente a ..., estacionamiento propio". Vacío = no se muestra.
  mapsUrl: "https://maps.app.goo.gl/zJovD6woEgCbhf3w7",
  horarioTexto: "Lunes a sábado, de 8:00 a 20:00. Domingo cerrado.",
  // 0 = domingo; [abre, cierra] en horas
  horario: { 0: null, 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [8, 20] } as Record<
    number,
    [number, number] | null
  >,
  zonaHoraria: "America/Ciudad_Juarez",
  // Link corto de Google Calendar: Google no deja incrustarlo, se abre en pestaña nueva.
  calendario: "https://calendar.app.google/PbCx1BSLJWFZ3VQYA",
  precio: "199.99",
  medico: {
    nombre: "Dr. Gabriel Omar Parra Pizarro",
    cargo: "Médico general",
    cedula: "1049164",
  },
  licenciaSanitaria: "08 037 09 429",
  incluye: [
    "Valoración con médico general",
    "Toma de signos vitales y exploración física",
    "Revisión de tus estudios previos, si los traes",
    "Receta, si el médico la indica",
    "Orientación clara sobre tu siguiente paso",
    "Seguimiento posterior cuando corresponda",
  ],
  atendemos: [
    "Gripa, tos o dolor de garganta",
    "Fiebre o malestar general",
    "Dolor de espalda",
    "Dolor que baja a la pierna",
    "Dolor abdominal o malestar estomacal",
    "Dolor de rodilla o articulaciones",
    "Molestias al orinar",
    "Control de presión o azúcar",
    "Revisión de estudios",
    "Seguimiento de tratamiento",
  ],
  // precio vacío = se muestra "Se cotiza"
  precios: [
    { servicio: "Consulta médica presencial", precio: "199.99", nota: "Valoración, receta si se indica y orientación sobre el siguiente paso." },
    { servicio: "Medicamentos", precio: "", nota: "Precio de proveedor, según receta, indicación y disponibilidad." },
    { servicio: "Estudios de laboratorio e imagen", precio: "", nota: "Te mostramos opciones y podemos comparar precios." },
    { servicio: "Especialista", precio: "", nota: "Te orientamos hacia opciones dentro de la red Lymbika." },
  ],
};

const telefono = WHATSAPP_NUMBER.slice(2);

export const TELEFONO_FMT = telefono.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
export const TEL_HREF = `tel:+${WHATSAPP_NUMBER}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(SUCURSAL.direccion)}&output=embed`;

export function whatsappHref(motivo?: string) {
  let texto = `Hola, quiero apartar una consulta médica presencial de $${SUCURSAL.precio} en ${SUCURSAL.nombre}`;
  if (motivo) texto += `, por ${motivo.toLowerCase()}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${texto}.`)}`;
}
