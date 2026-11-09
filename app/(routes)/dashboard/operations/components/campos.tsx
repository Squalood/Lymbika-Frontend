"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { APORTO, CANAL, ORIGEN, ORIGEN_DETALLE } from "@/lib/case/labels";
import { CaseAporto, CaseCanal, CaseOrigen, MiembroEquipo } from "@/types/case";

/** Piezas de formulario compartidas por el editor, el panel rápido y el alta de casos. */

export const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

export function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-xl border bg-background p-5">
      <h2 className="font-semibold">{titulo}</h2>
      {children}
    </section>
  );
}

export function Campo({ label, ayuda, htmlFor, children }: {
  label: string;
  ayuda?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {ayuda && <p className="text-xs text-muted-foreground">{ayuda}</p>}
    </div>
  );
}

export function Casilla({ id, checked, onChange, children }: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5" />
      <Label htmlFor={id} className="font-normal leading-snug">
        {children}
      </Label>
    </div>
  );
}

/** Select de usuarios del equipo. "" = sin asignar (o el texto de `vacio`). */
export function SelectEquipo({ id, equipo, value, onChange, vacio = "Sin asignar", disabled }: {
  id: string;
  equipo: MiembroEquipo[];
  value: string;
  onChange: (documentId: string) => void;
  vacio?: string;
  disabled?: boolean;
}) {
  // Un usuario asignado que ya no está en el equipo (bloqueado, cambió de rol)
  // se sigue mostrando para no perder el dato al guardar otra cosa.
  const fuera = value && !equipo.some((m) => m.documentId === value);
  return (
    <select
      id={id}
      className={selectClass}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{vacio}</option>
      {fuera && <option value={value}>Usuario fuera del equipo</option>}
      {equipo.map((m) => (
        <option key={m.documentId} value={m.documentId}>
          {m.nombre}
        </option>
      ))}
    </select>
  );
}

export type Procedencia = {
  originType: CaseOrigen | "";
  originDetail: string;
  channel: CaseCanal | "";
  referredBy: CaseAporto | "";
};

/**
 * Origen, fuente específica, canal y quién aportó al paciente. La fuente solo
 * se pide cuando el origen la necesita, con la pregunta de ese origen.
 */
export function CamposProcedencia({ id, valor, onChange }: {
  id: string;
  valor: Procedencia;
  onChange: (cambios: Partial<Procedencia>) => void;
}) {
  const preguntaDetalle = valor.originType ? ORIGEN_DETALLE[valor.originType] : undefined;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo label="Origen" htmlFor={`${id}-origen`}>
          <select
            id={`${id}-origen`}
            className={selectClass}
            value={valor.originType}
            onChange={(e) => onChange({ originType: e.target.value as Procedencia["originType"] })}
          >
            <option value="">Sin registrar</option>
            {(Object.keys(ORIGEN) as CaseOrigen[]).map((o) => (
              <option key={o} value={o}>
                {ORIGEN[o]}
              </option>
            ))}
          </select>
        </Campo>
        {preguntaDetalle && (
          <Campo label={preguntaDetalle} htmlFor={`${id}-detalle`}>
            <Input
              id={`${id}-detalle`}
              value={valor.originDetail}
              maxLength={120}
              onChange={(e) => onChange({ originDetail: e.target.value })}
            />
          </Campo>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo label="Canal de contacto" htmlFor={`${id}-canal`}>
          <select
            id={`${id}-canal`}
            className={selectClass}
            value={valor.channel}
            onChange={(e) => onChange({ channel: e.target.value as Procedencia["channel"] })}
          >
            <option value="">Sin registrar</option>
            {(Object.keys(CANAL) as CaseCanal[]).map((c) => (
              <option key={c} value={c}>
                {CANAL[c]}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="¿Quién aportó al paciente?" htmlFor={`${id}-aporto`}>
          <select
            id={`${id}-aporto`}
            className={selectClass}
            value={valor.referredBy}
            onChange={(e) => onChange({ referredBy: e.target.value as Procedencia["referredBy"] })}
          >
            <option value="">Sin registrar</option>
            {(Object.keys(APORTO) as CaseAporto[]).map((a) => (
              <option key={a} value={a}>
                {APORTO[a]}
              </option>
            ))}
          </select>
        </Campo>
      </div>
    </div>
  );
}
