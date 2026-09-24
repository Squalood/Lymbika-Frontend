"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { iniciarSuscripcion } from "@/app/data/actions/subscription-actions";

/**
 * Lógica compartida del botón "suscribirme".
 *
 * Es un hook y no un componente porque las dos tarjetas de planes tienen
 * markup muy distinto (plans.tsx usa el Button de shadcn, plansAlt.tsx un
 * button propio sobre fondo oscuro). Unificarlas obligaría a parametrizar todo
 * el estilo; así cada una conserva el suyo y comparten el comportamiento.
 */
export function useSubscribe() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const subscribe = (membershipId: string, isFamilyPlan: boolean) => {
    if (pending) return;

    startTransition(async () => {
      const res = await iniciarSuscripcion(
        membershipId,
        isFamilyPlan ? "familiar" : "personal"
      );

      if ("redirectTo" in res) {
        router.push(res.redirectTo);
        return;
      }
      if ("error" in res) {
        toast.error(res.error);
        return;
      }

      // Navegación en la misma pestaña, a propósito: `window.open` después de
      // un await lo bloquea el navegador por no venir de un gesto directo del
      // usuario, y el botón se quedaría sin hacer nada.
      window.location.assign(res.url);
    });
  };

  return { subscribe, pending };
}
