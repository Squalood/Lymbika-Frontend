"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CtaLink } from "./CtaLink";

// Reserva el alto de la barra al final del body para que no tape el footer.
const BODY_PADDING = ["pb-[76px]", "md:pb-0"];

/** Barra fija de acciones en móvil. Reemplaza al botón flotante de WhatsApp en esta página. */
export function StickyBar({ hrefs }: { hrefs: { agendar: string; whatsapp: string; llamar: string } }) {
  useEffect(() => {
    document.body.classList.add(...BODY_PADDING);
    return () => document.body.classList.remove(...BODY_PADDING);
  }, []);

  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.25fr_1.15fr_1fr] gap-1.5 border-t border-border bg-background px-2.5 pb-[calc(8px+env(safe-area-inset-bottom,0px))] pt-2 shadow-[0_-6px_18px_rgba(18,40,107,0.10)] md:hidden"
    >
      <Button asChild className="h-[52px] min-w-0 rounded-xl px-1.5 font-semibold">
        <CtaLink accion="agendar" href={hrefs.agendar} ubicacion="sticky" icono>
          Agendar
        </CtaLink>
      </Button>
      <Button asChild className="h-[52px] min-w-0 rounded-xl bg-green-500 px-1.5 font-semibold text-white hover:bg-green-600">
        <CtaLink accion="whatsapp" href={hrefs.whatsapp} ubicacion="sticky" icono>
          WhatsApp
        </CtaLink>
      </Button>
      <Button asChild variant="outline" className="h-[52px] min-w-0 rounded-xl border-primary px-1.5 font-semibold text-primary hover:text-primary">
        <CtaLink accion="llamar" href={hrefs.llamar} ubicacion="sticky" icono>
          Llamar
        </CtaLink>
      </Button>
    </nav>
  );
}
