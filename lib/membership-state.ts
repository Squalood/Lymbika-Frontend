import type { SubscriptionTier, UserType } from "@/types/user";

/**
 * Traduce los campos sueltos de suscripción a uno de cinco estados.
 *
 * Vive aparte del componente a propósito: así la regla se puede leer de un
 * vistazo y probar sin montar React. El componente decide cómo se ve cada
 * estado; aquí solo se decide cuál es.
 */

export type MembershipStateKind =
  | "active"
  | "canceling"
  | "payment_failed"
  | "manual"
  | "none";

export type MembershipState = {
  kind: MembershipStateKind;
  /** ISO crudo, sin formatear. `null` cuando no aplica o no llegó. */
  periodEnd: string | null;
  tier: SubscriptionTier | null;
  /** Solo en `payment_failed`: el que falló fue el PRIMER cobro. */
  firstCharge: boolean;
};

type Entrada = Pick<
  UserType,
  | "membershipActive"
  | "membershipManual"
  | "subscriptionStatus"
  | "subscriptionCurrentPeriodEnd"
  | "subscriptionCancelAtPeriodEnd"
  | "subscriptionTier"
>;

export function resolveMembershipState(user: Entrada): MembershipState {
  const status = user.subscriptionStatus;
  const periodEnd = user.subscriptionCurrentPeriodEnd ?? null;
  const tier = user.subscriptionTier ?? null;

  const base = { periodEnd, tier, firstCharge: false };

  // El ORDEN de estas comprobaciones es la decisión de diseño.

  // 1. Cobro fallido. Va primero porque es el único estado que el usuario
  //    tiene que atender: Stripe está reintentando y puede perder el beneficio.
  if (status === "past_due" || status === "unpaid") {
    return { ...base, kind: "payment_failed" };
  }

  // 2. El primer cobro nunca cuajó (3-D Secure abandonado, tarjeta rechazada).
  //    Mismo estado visual, pero el texto tiene que ser distinto: no es "tu
  //    último pago falló" si nunca hubo uno.
  if (status === "incomplete") {
    return { ...base, kind: "payment_failed", firstCharge: true };
  }

  if (status === "active" || status === "trialing") {
    return {
      ...base,
      kind: user.subscriptionCancelAtPeriodEnd ? "canceling" : "active",
    };
  }

  // `paused` conserva el acceso hasta la fecha, igual que una cancelación
  // programada, así que comparte estado visual.
  if (status === "paused") {
    return { ...base, kind: "canceling" };
  }

  // 3. Cortesía. Va AL FINAL, no al principio: alguien con cortesía que además
  //    se suscribió tiene los dos flags, y evaluarlo antes le escondería el
  //    portal a quien está pagando y no podría cancelar.
  //
  //    Es también la forma de detectar el caso manual sin ver
  //    `stripeCustomerId`, que el frontend nunca recibe por ser `private`.
  //
  //    No se exige `status === "none"`: llegados aquí ya se descartaron todos
  //    los estados en los que Stripe concede el beneficio, así que si
  //    `membershipActive` sigue en `true` es porque la cortesía lo sostiene.
  //    Cubre al miembro de cortesía que además tuvo una suscripción y la
  //    canceló — el carrito le da precio de miembro y la tarjeta tiene que
  //    decir lo mismo.
  if (user.membershipManual === true && user.membershipActive === true) {
    return { ...base, kind: "manual", periodEnd: null };
  }

  // Aquí cae también `canceled` con `membershipActive` todavía en `true`: es la
  // carrera del webhook y dura segundos. Se deja caer a `none` a propósito en
  // vez de inventar un sexto estado para una ventana de dos segundos — el
  // sincronizador de la vuelta del portal es quien lo resuelve.
  return { ...base, kind: "none", periodEnd: null };
}
