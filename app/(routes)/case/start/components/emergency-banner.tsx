import { TriangleAlert } from "lucide-react";

/** Aviso en vivo cuando la narrativa suena a emergencia. Nunca bloquea el flujo. */
export function EmergencyBanner() {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
    >
      <TriangleAlert className="h-5 w-5 shrink-0" />
      <div className="space-y-1">
        <p className="font-semibold">Si es una emergencia, llama al 911 o acude a urgencias.</p>
        <p>
          Lymbika coordina atención médica programada y no atiende emergencias. Puedes
          continuar con tu solicitud si no es urgente.
        </p>
      </div>
    </div>
  );
}
