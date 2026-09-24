"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { abrirPortalDeFacturacion } from "@/app/data/actions/subscription-actions";

interface PortalButtonProps {
  label: string;
  variant?: "default" | "outline" | "destructive";
}

/**
 * Abre el Customer Portal de Stripe en una sesión firmada.
 *
 * Es componente y no hook —al revés que `useSubscribe`— porque los tres CTAs
 * que lo usan (Administrar, Reactivar, Actualizar método de pago) comparten
 * markup y solo cambia el texto.
 */
export function PortalButton({ label, variant = "default" }: PortalButtonProps) {
  const [pending, startTransition] = useTransition();

  const abrir = () => {
    if (pending) return;

    startTransition(async () => {
      const res = await abrirPortalDeFacturacion();

      if ("error" in res) {
        toast.error(res.error);
        return;
      }

      // Misma pestaña a propósito: `window.open` después de un await lo bloquea
      // el navegador por no venir de un gesto directo del usuario.
      window.location.assign(res.url);
    });
  };

  return (
    <Button onClick={abrir} disabled={pending} variant={variant} className="w-full gap-2">
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? "Abriendo…" : label}
    </Button>
  );
}
