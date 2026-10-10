"use client";

import { Calendar, MapPin, Phone } from "lucide-react";
import { whatsappIcon } from "@/components/whatsapp-button";
import * as gtag from "@/lib/gtag";

type Accion = "agendar" | "whatsapp" | "llamar" | "maps";

interface CtaLinkProps {
  accion: Accion;
  /** Lo arma el servidor con el contenido de Strapi (ver config.ts). */
  href: string;
  /** Dónde está el botón en la página; viaja en el evento de GA. */
  ubicacion: string;
  /** Motivo de consulta, sólo para el evento de GA. */
  motivo?: string;
  className?: string;
  ariaLabel?: string;
  /** Antepone el icono de la acción. */
  icono?: boolean;
  children: React.ReactNode;
}

const ICONOS: Record<Accion, React.ReactNode> = {
  agendar: <Calendar />,
  whatsapp: whatsappIcon,
  llamar: <Phone />,
  maps: <MapPin />,
};

/** Enlace de acción de la landing: abre el destino y registra el clic en GA. */
export function CtaLink({ accion, href, ubicacion, motivo, className, ariaLabel, icono, children }: CtaLinkProps) {
  const externo = accion !== "llamar";

  return (
    <a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={className}
      onClick={() =>
        gtag.event({
          action: `click_${accion}`,
          category: "schedules",
          label: motivo ? `${ubicacion} - ${motivo}` : ubicacion,
        })
      }
    >
      {icono && ICONOS[accion]}
      {children}
    </a>
  );
}
