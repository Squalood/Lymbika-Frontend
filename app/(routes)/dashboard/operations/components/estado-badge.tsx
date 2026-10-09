import { cn } from "@/lib/utils";
import { ESTADO_COORDINADOR, PRIORIDAD } from "@/lib/case/labels";
import { CaseEstado, CasePriority } from "@/types/case";

const COLOR_ESTADO: Record<CaseEstado, string> = {
  new: "bg-blue-100 text-blue-800",
  in_coordination: "bg-indigo-100 text-indigo-800",
  in_assessment: "bg-violet-100 text-violet-800",
  in_decision: "bg-amber-100 text-amber-800",
  scheduled: "bg-teal-100 text-teal-800",
  in_surgery: "bg-cyan-100 text-cyan-800",
  in_follow_up: "bg-emerald-100 text-emerald-800",
  closed_won: "bg-green-100 text-green-800",
  closed_lost: "bg-gray-200 text-gray-700",
};

export function EstadoBadge({ estado }: { estado: CaseEstado }) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
        COLOR_ESTADO[estado]
      )}
    >
      {ESTADO_COORDINADOR[estado]}
    </span>
  );
}

export function PrioridadBadge({ prioridad }: { prioridad: CasePriority | null }) {
  if (!prioridad || prioridad === "normal") return null;
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium",
        prioridad === "urgent" && "bg-red-100 text-red-800",
        prioridad === "high" && "bg-orange-100 text-orange-800",
        prioridad === "low" && "bg-gray-100 text-gray-600"
      )}
    >
      {PRIORIDAD[prioridad]}
    </span>
  );
}

export function UrgenteBadge() {
  return (
    <span className="inline-flex whitespace-nowrap rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
      Posible emergencia
    </span>
  );
}

export function EspecialistaBadge({ nombre }: { nombre?: string | null }) {
  const asignado = nombre?.trim();
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
        asignado ? "bg-sky-100 text-sky-800" : "border border-dashed border-gray-300 text-gray-500"
      )}
    >
      {asignado || "No asignado"}
    </span>
  );
}
