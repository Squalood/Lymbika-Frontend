"use client";

import { Calendar, MapPin, Phone } from "lucide-react";
import { whatsappIcon } from "@/components/whatsapp-button";
import * as gtag from "@/lib/gtag";
import { SUCURSAL, TEL_HREF, whatsappHref } from "../config";

type Accion = "agendar" | "whatsapp" | "llamar" | "maps";

interface CtaLinkProps {
  accion: Accion;
  /** Dónde está el botón en la página; viaja en el evento de GA. */
  ubicacion: string;
  /** Motivo de consulta: se escribe en el mensaje de WhatsApp. */
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

function hrefPara(accion: Accion, motivo?: string) {
  switch (accion) {
    case "agendar":
      return SUCURSAL.calendario;
    case "whatsapp":
      return whatsappHref(motivo);
    case "llamar":
      return TEL_HREF;
    case "maps":
      return SUCURSAL.mapsUrl;
  }
}

/** Enlace de acción de la landing: arma el href y registra el clic en GA. */
export function CtaLink({ accion, ubicacion, motivo, className, ariaLabel, icono, children }: CtaLinkProps) {
  const externo = accion !== "llamar";

  return (
    <a
      href={hrefPara(accion, motivo)}
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
