"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SUCURSAL } from "../config";

const DIAS = ["el domingo", "el lunes", "el martes", "el miércoles", "el jueves", "el viernes", "el sábado"];
const DIA_SEMANA: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Día y hora decimal en la zona de la sucursal, no en la del visitante. */
function ahoraEnSucursal() {
  const partes: Record<string, string> = {};
  new Intl.DateTimeFormat("en-US", {
    timeZone: SUCURSAL.zonaHoraria,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  })
    .formatToParts(new Date())
    .forEach((p) => (partes[p.type] = p.value));
  return {
    dia: DIA_SEMANA[partes.weekday],
    hora: (parseInt(partes.hour, 10) % 24) + parseInt(partes.minute, 10) / 60,
  };
}

function estado(): { abierto: boolean; mensaje: string } | null {
  const { dia, hora } = ahoraEnSucursal();
  const hoy = SUCURSAL.horario[dia];

  if (hoy && hora >= hoy[0] && hora < hoy[1]) {
    return { abierto: true, mensaje: `Abierto ahora, hasta las ${hoy[1]}:00` };
  }
  if (hoy && hora < hoy[0]) {
    return { abierto: false, mensaje: `Hoy abrimos a las ${hoy[0]}:00. Aparta tu lugar.` };
  }
  for (let k = 1; k <= 7; k++) {
    const d = (dia + k) % 7;
    const h = SUCURSAL.horario[d];
    if (h) {
      return {
        abierto: false,
        mensaje: `Abrimos ${k === 1 ? "mañana" : DIAS[d]} a las ${h[0]}:00. Aparta tu lugar.`,
      };
    }
  }
  return null;
}

/**
 * Se calcula en el navegador: la página sale del caché ISR y una hora
 * calculada en el servidor quedaría vieja.
 */
export function OpenStatus() {
  const [actual, setActual] = useState<ReturnType<typeof estado>>(null);

  useEffect(() => {
    try {
      setActual(estado());
    } catch {
      // Navegadores sin la zona horaria: no se muestra el estado.
    }
  }, []);

  if (!actual) return null;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        actual.abierto ? "bg-green-500/20 text-green-200" : "bg-white/10 text-white/80"
      )}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {actual.mensaje}
    </p>
  );
}
