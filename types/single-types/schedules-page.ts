import { ContactComponent } from "@/types/contact"

/** Componente item.pill / plus.plus: una línea de texto. */
type TextItem = {
  id: number
  text: string | null
}

/**
 * Doctor de la colección ligado a la landing. Cada uno tiene su variante en
 * /schedules/[slug]; priceCon y calendarLink vacíos caen a los de la sucursal.
 */
export type SchedulesDoctor = {
  id: number
  doctorName: string | null
  slug: string | null
  /** Cargo y cédula, en una línea. */
  credentials: string | null
  /** Link de Google Calendar del doctor. */
  calendarLink: string | null
  priceCon: number | null
  mainImage?: { url: string } | null
  image?: { url: string }[] | null
}

/**
 * Single type schedules-page: la landing de consulta de Farmacia+ (/schedules).
 * Cualquier campo vacío cae al valor de app/(routes)/schedules/config.ts.
 */
export type SchedulesPageType = {
  seoTitle?: string | null
  seoDescription?: string | null
  /** Nombre de la sucursal: va en el mensaje de WhatsApp y en el JSON-LD. */
  branchName?: string | null
  city?: string | null
  /** Marca de agua del hero. Se pinta como silueta blanca: mejor SVG o PNG transparente. */
  logo?: { url: string } | null
  title?: string | null
  description?: string | null
  priceLabel?: string | null
  price?: number | null
  /** Relación a la colección doctor. El primero es el que sale en /schedules. */
  doctors?: SchedulesDoctor[] | null
  /** Franja debajo del hero (item.pill). */
  benefits?: TextItem[] | null
  /** Qué incluye la consulta (plus.plus). */
  includes?: TextItem[] | null
  /** Aviso "¿Ya tienes estudios?" (badge.badge): boldText va en negritas. */
  tip?: { id: number; boldText: string | null; text: string | null } | null
  /**
   * Tabla de precios (pricing.plan): name, description y price. Sin price = "Se cotiza".
   * La primera fila es la consulta: si trae precio, se sustituye por el de la variante.
   */
  prices?: {
    id: number
    name: string | null
    description: string | null
    price: number | null
  }[] | null
  pricesNote?: string | null
  /** Motivos de consulta (item.pill). Cada uno abre WhatsApp con el motivo escrito. */
  reasons?: TextItem[] | null
  /** "Si necesitas algo más" (feature.features). El último se muestra en gris. */
  steps?: { id: number; title: string | null; description: string | null }[] | null
  promise?: string | null
  /**
   * contact.contact. En esta página: direccionText = dirección, timeText = horario,
   * contactLocation = link de Google Maps, contactScheduleLink = Google Calendar,
   * contactPhone = teléfono y WhatsApp, description = referencias, image = fachada.
   */
  contact?: Partial<ContactComponent> | null
  sanitaryLicense?: string | null
}
