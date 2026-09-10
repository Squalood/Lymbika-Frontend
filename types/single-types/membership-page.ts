import { FaqType } from "@/types/faq"
import { MembershipType } from "@/types/membership"

export type MembershipBadge = {
  id: number
  boldText: string
  text: string
  tag?: string
}

/** Textos fijos de la página. Si vienen vacíos, el componente cae al literal. */
export type MembershipTexts = {
  id: number
  toggle_personal?: string | null
  toggle_family?: string | null
  featured_label?: string | null
  price_period?: string | null
}

export type MembershipPageType = {
  seoTitle?: string | null
  seoDescription?: string | null
  title?: string | null
  description?: string | null
  badge?: MembershipBadge | null
  texts?: MembershipTexts | null
  /** Planes elegidos a mano en el admin. El orden es el del admin, no el campo
   *  `order` de cada plan. Si viene vacío, la página cae a todos los publicados. */
  memberships?: MembershipType[] | null
  /** Relación al collection type faq-group. El título y la descripción del
   *  bloque salen del propio grupo (title / descripction). */
  faq_group?: FaqType | null
}
