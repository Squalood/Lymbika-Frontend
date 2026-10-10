import { WHATSAPP_NUMBER } from "@/lib/constants";
import { clean } from "@/lib/utils";
import { SchedulesPageType } from "@/types/single-types/schedules-page";

/**
 * Horario estructurado de la sucursal. Se queda en código: de aquí salen el
 * estado "Abierto ahora" y el JSON-LD, y necesitan exactamente este formato.
 * El texto visible del horario sí viene de Strapi (contact.timeText).
 */
export const HORARIO: Record<number, [number, number] | null> = {
  0: null, // domingo
  1: [8, 20],
  2: [8, 20],
  3: [8, 20],
  4: [8, 20],
  5: [8, 20],
  6: [8, 20],
};
export const ZONA_HORARIA = "America/Ciudad_Juarez";
export const ESTADO = "Chihuahua";

export type ScheduleContent = {
  nombre: string;
  ciudad: string;
  titulo: string;
  subtitulo: string;
  precioEtiqueta: string;
  precio: string;
  medico: { nombre: string; descripcion: string; foto?: string };
  beneficios: string[];
  incluye: string[];
  aviso: { negritas: string; texto: string };
  precios: { servicio: string; precio: string; nota: string }[];
  notaPrecios: string;
  atendemos: string[];
  pasos: { titulo: string; texto: string }[];
  promesa: string;
  ubicacion: {
    titulo: string;
    direccion: string;
    referencias: string;
    horarioTexto: string;
    mapsUrl: string;
    foto?: string;
  };
  calendario: string;
  /** Con lada 52, sólo dígitos. Se usa para llamar y para WhatsApp. */
  telefono: string;
  licenciaSanitaria: string;
};

/**
 * Contenido por defecto: lo que se muestra mientras el single type
 * schedules-page no exista en Strapi, o cuando un campo venga vacío.
 */
export const DEFAULTS: ScheduleContent = {
  nombre: "Farmacia+ Paseo de la Victoria",
  ciudad: "Ciudad Juárez",
  titulo: "¿Necesitas consulta médica?",
  subtitulo: "Empieza aquí. Te valoramos y te ayudamos con el siguiente paso.",
  precioEtiqueta: "Valoración presencial",
  precio: "199.99",
  medico: {
    nombre: "Dr. Gabriel Omar Parra Pizarro",
    descripcion: "Médico general. Cédula profesional 1049164",
  },
  beneficios: ["Consulta médica", "Medicamentos", "Estudios", "Especialistas", "Seguimiento"],
  incluye: [
    "Valoración con médico general",
    "Toma de signos vitales y exploración física",
    "Revisión de tus estudios previos, si los traes",
    "Receta, si el médico la indica",
    "Orientación clara sobre tu siguiente paso",
    "Seguimiento posterior cuando corresponda",
  ],
  aviso: { negritas: "¿Ya tienes estudios?", texto: "Tráelos. Podemos revisarlos contigo." },
  precios: [
    { servicio: "Consulta médica presencial", precio: "199.99", nota: "Valoración, receta si se indica y orientación sobre el siguiente paso." },
    { servicio: "Medicamentos", precio: "", nota: "Precio de proveedor, según receta, indicación y disponibilidad." },
    { servicio: "Estudios de laboratorio e imagen", precio: "", nota: "Te mostramos opciones y podemos comparar precios." },
    { servicio: "Especialista", precio: "", nota: "Te orientamos hacia opciones dentro de la red Lymbika." },
  ],
  notaPrecios: "Medicamentos, estudios y especialista se pagan aparte, sólo si los necesitas y tú decides.",
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
  pasos: [
    { titulo: "Medicamentos", texto: "Acceso a medicamentos a precio de proveedor, según receta, indicación y disponibilidad." },
    { titulo: "Estudios", texto: "Te ayudamos a revisar opciones de laboratorio e imagen y comparar precios entre proveedores." },
    { titulo: "Especialistas", texto: "Acceso y orientación hacia especialistas dentro de la red Lymbika cuando tu caso lo requiera." },
    { titulo: "Seguimiento", texto: "Podemos ayudarte a dar continuidad a tu caso después de la consulta." },
    {
      titulo: "Cirugía, si llegara a necesitarse",
      texto: "Si existe una indicación quirúrgica, Lymbika puede ayudarte a revisar opciones de médico, hospital y costos.",
    },
  ],
  promesa: "No tienes que resolver cada paso por tu cuenta.",
  ubicacion: {
    titulo: "Dónde estamos",
    direccion: "Av. Paseo de la Victoria 9350, Ciudad Juárez, Chih.",
    referencias: "",
    horarioTexto: "Lunes a sábado, de 8:00 a 20:00. Domingo cerrado.",
    mapsUrl: "https://maps.app.goo.gl/zJovD6woEgCbhf3w7",
  },
  // Link corto de Google Calendar: Google no deja incrustarlo, se abre en pestaña nueva.
  calendario: "https://calendar.app.google/PbCx1BSLJWFZ3VQYA",
  telefono: WHATSAPP_NUMBER,
  licenciaSanitaria: "08 037 09 429",
};

/** Lista de textos de Strapi sin vacíos; si queda vacía, el default. */
function textos(items: { text: string | null }[] | null | undefined, porDefecto: string[]) {
  const limpios = (items ?? []).map((i) => clean(i.text)).filter((t): t is string => !!t);
  return limpios.length > 0 ? limpios : porDefecto;
}

const precioTexto = (precio: number | null | undefined) =>
  precio == null ? "" : Number(precio).toFixed(2);

/** 10 dígitos → con lada 52; cualquier otro formato se respeta. */
function telefonoConLada(valor?: string | null) {
  const digitos = valor?.replace(/\D/g, "") ?? "";
  if (!digitos) return undefined;
  return digitos.length === 10 ? `52${digitos}` : digitos;
}

/** Mezcla el single type de Strapi con los defaults, campo por campo. */
export function resolverContenido(page: SchedulesPageType | null): ScheduleContent {
  const d = DEFAULTS;
  if (!page) return d;
  const { contact, doctor, tip } = page;

  const precios = (page.prices ?? [])
    .filter((p) => clean(p.name))
    .map((p) => ({ servicio: clean(p.name)!, precio: precioTexto(p.price), nota: clean(p.description) ?? "" }));
  const pasos = (page.steps ?? [])
    .filter((p) => clean(p.title))
    .map((p) => ({ titulo: clean(p.title)!, texto: clean(p.description) ?? "" }));

  return {
    nombre: clean(page.branchName) ?? d.nombre,
    ciudad: clean(page.city) ?? d.ciudad,
    titulo: clean(page.title) ?? d.titulo,
    subtitulo: clean(page.description) ?? d.subtitulo,
    precioEtiqueta: clean(page.priceLabel) ?? d.precioEtiqueta,
    precio: precioTexto(page.price) || d.precio,
    medico: clean(doctor?.name)
      ? { nombre: clean(doctor?.name)!, descripcion: clean(doctor?.description) ?? "", foto: doctor?.image?.url }
      : d.medico,
    beneficios: textos(page.benefits, d.beneficios),
    incluye: textos(page.includes, d.incluye),
    aviso: clean(tip?.text)
      ? { negritas: clean(tip?.boldText) ?? "", texto: clean(tip?.text)! }
      : d.aviso,
    precios: precios.length > 0 ? precios : d.precios,
    notaPrecios: clean(page.pricesNote) ?? d.notaPrecios,
    atendemos: textos(page.reasons, d.atendemos),
    pasos: pasos.length > 0 ? pasos : d.pasos,
    promesa: clean(page.promise) ?? d.promesa,
    ubicacion: {
      titulo: clean(contact?.title) ?? d.ubicacion.titulo,
      direccion: clean(contact?.direccionText) ?? d.ubicacion.direccion,
      // Las referencias son opcionales: si el contacto existe y viene vacío, no se muestran.
      referencias: contact ? clean(contact.description) ?? "" : d.ubicacion.referencias,
      horarioTexto: clean(contact?.timeText) ?? d.ubicacion.horarioTexto,
      mapsUrl: clean(contact?.contactLocation) ?? d.ubicacion.mapsUrl,
      foto: contact?.image?.url,
    },
    calendario: clean(contact?.contactScheduleLink) ?? d.calendario,
    telefono: telefonoConLada(contact?.contactPhone) ?? d.telefono,
    licenciaSanitaria: clean(page.sanitaryLicense) ?? d.licenciaSanitaria,
  };
}

/* ===== Enlaces derivados del contenido ===== */

export const telHref = (c: ScheduleContent) => `tel:+${c.telefono}`;

export const telefonoFmt = (c: ScheduleContent) =>
  c.telefono.slice(-10).replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

export const mapsEmbed = (c: ScheduleContent) =>
  `https://www.google.com/maps?q=${encodeURIComponent(c.ubicacion.direccion)}&output=embed`;

export function whatsappHref(c: ScheduleContent, motivo?: string) {
  let texto = `Hola, quiero apartar una consulta médica presencial de $${c.precio} en ${c.nombre}`;
  if (motivo) texto += `, por ${motivo.toLowerCase()}`;
  return `https://wa.me/${c.telefono}?text=${encodeURIComponent(`${texto}.`)}`;
}
