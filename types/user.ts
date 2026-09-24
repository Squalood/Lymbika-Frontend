/** Espejo del `status` de la suscripcion en Stripe. */
export type SubscriptionStatus =
  | "none"
  | "incomplete"
  | "trialing"
  | "active"
  | "past_due"
  | "unpaid"
  | "canceled"
  | "paused";

export type SubscriptionTier = "personal" | "familiar";

export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  firstName: string;
  lastName: string;
  bio: string;
  membershipActive: boolean;

  // ── Suscripcion ────────────────────────────────────────────────────────────
  // Opcionales a proposito: getUserMeLoader devuelve el JSON crudo de Strapi
  // sin validar nada, asi que declararlos requeridos seria una promesa que
  // TypeScript no puede sostener.
  //
  // `stripeCustomerId` y `stripeSubscriptionId` NO se declaran: son `private`
  // en Strapi y nunca llegan al frontend. Tenerlos aqui invitaria a escribir
  // `if (user.stripeCustomerId)`, una condicion siempre falsa.
  subscriptionStatus?: SubscriptionStatus;
  /** Fecha ISO del fin del periodo pagado en curso. */
  subscriptionCurrentPeriodEnd?: string | null;
  subscriptionCancelAtPeriodEnd?: boolean;
  subscriptionTier?: SubscriptionTier | null;
  /** Membresia de cortesia activada a mano por el equipo. */
  membershipManual?: boolean;
  reviews: {
    id: number;
    comment: string;
    waitingTime: number;
    recommend: number;
    bedsideManner: number;
    visitAgain: number;
    createdAt: string;
    updatedAt: string;
  }[];
};