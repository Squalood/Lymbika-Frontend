"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { guardarPanel, type PanelCaso } from "@/app/data/actions/case-admin-actions";
import { ESTADO_COORDINADOR, ETAPAS, MOTIVO_CIERRE, PRIORIDAD, etapaDe } from "@/lib/case/labels";
import { fechaCorta } from "@/lib/case/operations";
import {
  AdminCaseType,
  CaseEstado,
  CaseMotivoCierre,
  CasePriority,
  MiembroEquipo,
} from "@/types/case";
import { Campo, SelectEquipo, selectClass } from "./campos";

type Props = {
  caso: AdminCaseType;
  equipo: MiembroEquipo[];
  /** false para un especialista: el coordinador del caso lo decide coordinación. */
  puedeAsignarCoordinador: boolean;
  /** Hoy en Juárez ("YYYY-MM-DD"), calculado en el servidor para no desfasar la hidratación. */
  hoy: string;
};

/**
 * Cabecera del expediente: dónde está el caso, qué sigue, quién y cuándo. Se
 * guarda aparte del expediente (`guardarPanel`) para actualizarla sin
 * recorrerlo todo.
 */
export function PanelRapido({ caso, equipo, puedeAsignarCoordinador, hoy }: Props) {
  const router = useRouter();
  const [guardando, startTransition] = useTransition();
  const [cambios, setCambios] = useState(false);
  const [f, setF] = useState(() => ({
    estado: caso.estado,
    priority: (caso.priority ?? "normal") as CasePriority,
    closeReason: (caso.closeReason ?? "") as CaseMotivoCierre | "",
    nextAction: caso.nextAction ?? "",
    nextActionOwner: caso.nextActionOwner?.documentId ?? "",
    nextActionDue: caso.nextActionDue ?? "",
    blocker: caso.blocker ?? "",
    coordinator: caso.coordinator?.documentId ?? "",
    nextReviewDate: caso.nextReviewDate ?? "",
  }));

  function set<K extends keyof typeof f>(campo: K, valor: (typeof f)[K]) {
    setF((prev) => ({ ...prev, [campo]: valor }));
    setCambios(true);
  }

  const etapa = etapaDe(f.estado);
  const indiceEtapa = ETAPAS.indexOf(etapa);
  const vencida = Boolean(f.nextActionDue && f.nextActionDue < hoy && etapa.clave !== "cerrado");
  const enSeguimiento = etapa.clave === "seguimiento" || Boolean(f.nextReviewDate);

  function guardar() {
    if (f.estado === "closed_lost" && !f.closeReason) {
      toast.error("Para cerrar sin cirugía, elige el motivo.");
      return;
    }
    const datos: PanelCaso = {
      estado: f.estado,
      priority: f.priority,
      closeReason: f.closeReason || null,
      nextAction: f.nextAction,
      nextActionOwner: f.nextActionOwner || null,
      nextActionDue: f.nextActionDue || null,
      blocker: f.blocker,
      coordinator: f.coordinator || null,
      nextReviewDate: f.nextReviewDate || null,
    };
    startTransition(async () => {
      const resultado = await guardarPanel(caso.documentId, datos);
      if (resultado.ok) {
        toast.success("Caso actualizado.");
        setCambios(false);
        router.refresh();
      } else {
        toast.error(resultado.error);
      }
    });
  }

  return (
    <section className="space-y-4 rounded-xl border bg-background p-5">
      {/* Las 5 etapas; se puede saltar cualquiera eligiendo el estado. En el
          teléfono no caben los nombres: barras y una línea con la actual. */}
      <div className="space-y-2">
        <ol className="grid grid-cols-5 gap-1" aria-label="Etapa del caso">
          {ETAPAS.map((e, i) => {
            const actual = i === indiceEtapa;
            const pasada = i < indiceEtapa;
            return (
              <li
                key={e.clave}
                aria-current={actual ? "step" : undefined}
                className={cn(
                  "h-1.5 rounded-full border text-xs leading-tight sm:flex sm:h-auto sm:min-h-[3rem] sm:flex-col sm:justify-between sm:rounded-lg sm:px-2 sm:py-1.5",
                  actual && "border-primary bg-primary text-primary-foreground",
                  pasada && "border-primary/30 bg-primary/20 text-primary sm:bg-primary/5",
                  !actual && !pasada && "bg-muted text-muted-foreground sm:bg-transparent"
                )}
              >
                <span className="sr-only sm:not-sr-only sm:font-medium">{e.label}</span>
                {pasada && <Check className="hidden h-3.5 w-3.5 sm:block" aria-label="Etapa pasada" />}
                {actual && <span className="hidden opacity-90 sm:block">{ESTADO_COORDINADOR[f.estado]}</span>}
              </li>
            );
          })}
        </ol>
        <p className="text-sm sm:hidden">
          <span className="text-muted-foreground">
            Etapa {indiceEtapa + 1} de {ETAPAS.length} ·{" "}
          </span>
          <span className="font-medium">{etapa.label}</span>
          <span className="text-muted-foreground"> · {ESTADO_COORDINADOR[f.estado]}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Campo label="Estado" htmlFor="estado">
          <select
            id="estado"
            className={selectClass}
            value={f.estado}
            onChange={(e) => set("estado", e.target.value as CaseEstado)}
          >
            {ETAPAS.map((e) => (
              <optgroup key={e.clave} label={e.label}>
                {e.estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {ESTADO_COORDINADOR[estado]}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Campo>
        <Campo label="Prioridad clínica" htmlFor="prioridad">
          <select
            id="prioridad"
            className={selectClass}
            value={f.priority}
            onChange={(e) => set("priority", e.target.value as CasePriority)}
          >
            {(Object.keys(PRIORIDAD) as CasePriority[]).map((p) => (
              <option key={p} value={p}>
                {PRIORIDAD[p]}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="Coordinador del caso" htmlFor="coordinador">
          <SelectEquipo
            id="coordinador"
            equipo={equipo}
            value={f.coordinator}
            disabled={!puedeAsignarCoordinador}
            onChange={(v) => set("coordinator", v)}
          />
        </Campo>
      </div>

      {f.estado === "closed_lost" && (
        <Campo label="Motivo de cierre" htmlFor="motivo">
          <select
            id="motivo"
            className={selectClass}
            value={f.closeReason}
            onChange={(e) => set("closeReason", e.target.value as CaseMotivoCierre | "")}
          >
            <option value="">Elige el motivo</option>
            {(Object.keys(MOTIVO_CIERRE) as CaseMotivoCierre[]).map((m) => (
              <option key={m} value={m}>
                {MOTIVO_CIERRE[m]}
              </option>
            ))}
          </select>
        </Campo>
      )}

      <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <Campo label="Próxima acción" htmlFor="accion">
          <Input
            id="accion"
            value={f.nextAction}
            maxLength={500}
            placeholder="Ej. Confirmar hospital, esperar estudio, enviar cotización"
            onChange={(e) => set("nextAction", e.target.value)}
          />
        </Campo>
        <Campo label="Responsable" htmlFor="responsable">
          <SelectEquipo
            id="responsable"
            equipo={equipo}
            value={f.nextActionOwner}
            onChange={(v) => set("nextActionOwner", v)}
          />
        </Campo>
        <Campo
          label="Fecha compromiso"
          htmlFor="compromiso"
          ayuda={vencida ? `Vencida desde el ${fechaCorta(f.nextActionDue)}` : undefined}
        >
          <Input
            id="compromiso"
            type="date"
            value={f.nextActionDue}
            className={cn(vencida && "border-red-400 text-red-700")}
            onChange={(e) => set("nextActionDue", e.target.value)}
          />
        </Campo>
      </div>

      <div
        className={cn(
          "grid gap-4",
          enSeguimiento && "sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]"
        )}
      >
        <Campo label="Obstáculo" htmlFor="obstaculo" ayuda="Lo que hoy impide avanzar, si hay algo.">
          <Input
            id="obstaculo"
            value={f.blocker}
            maxLength={500}
            className={cn(f.blocker && "border-amber-400")}
            onChange={(e) => set("blocker", e.target.value)}
          />
        </Campo>
        {enSeguimiento && (
          <Campo label="Próxima revisión" htmlFor="revision">
            <Input
              id="revision"
              type="date"
              value={f.nextReviewDate}
              onChange={(e) => set("nextReviewDate", e.target.value)}
            />
          </Campo>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        {cambios && <span className="text-sm text-muted-foreground">Cambios sin guardar</span>}
        <Button type="button" onClick={guardar} disabled={guardando || !cambios}>
          {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
          Guardar
        </Button>
      </div>
    </section>
  );
}
