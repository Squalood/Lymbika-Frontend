"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  buscarCasosPorTelefono,
  crearCasoManual,
} from "@/app/data/actions/case-admin-actions";
import type { CasoConTelefono } from "@/app/data/services/case-admin-service";
import { ESTADO_COORDINADOR } from "@/lib/case/labels";
import { MiembroEquipo, OpcionCatalogo } from "@/types/case";
import { CamposProcedencia, SelectEquipo, selectClass, type Procedencia } from "./campos";

type Props = {
  procedimientos: OpcionCatalogo[];
  equipo: MiembroEquipo[];
  /** false para un especialista: el backend ignora el coordinador que elija. */
  puedeAsignarCoordinador: boolean;
};

/**
 * Alta breve: solo nombre y teléfono son obligatorios. El origen arranca como
 * "pendiente de identificar" para que no frene el alta y quede señalado en la
 * bandeja hasta completarlo.
 */
export function NuevoCasoForm({ procedimientos, equipo, puedeAsignarCoordinador }: Props) {
  const router = useRouter();
  const [enviando, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [repetidos, setRepetidos] = useState<CasoConTelefono[]>([]);
  const [f, setF] = useState({
    fullName: "",
    phone: "",
    city: "",
    narrative: "",
    medicalService: "",
    coordinator: "",
    originType: "pending" as Procedencia["originType"],
    originDetail: "",
    channel: "" as Procedencia["channel"],
    referredBy: "" as Procedencia["referredBy"],
  });

  function set<K extends keyof typeof f>(campo: K, valor: (typeof f)[K]) {
    setF((prev) => ({ ...prev, [campo]: valor }));
  }

  async function revisarTelefono() {
    setRepetidos(await buscarCasosPorTelefono(f.phone));
  }

  function crear(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const resultado = await crearCasoManual({
        ...f,
        medicalService: f.medicalService || null,
        coordinator: f.coordinator || null,
        originType: f.originType || null,
        channel: f.channel || null,
        referredBy: f.referredBy || null,
      });
      if (resultado.ok) router.push(`/dashboard/operations/${resultado.documentId}`);
      else setError(resultado.error);
    });
  }

  return (
    <form onSubmit={crear} className="space-y-4 rounded-xl border bg-background p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="n-nombre">Nombre</Label>
          <Input id="n-nombre" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="n-telefono">WhatsApp / teléfono</Label>
          <Input
            id="n-telefono"
            type="tel"
            value={f.phone}
            placeholder="656 000 0000"
            onChange={(e) => set("phone", e.target.value)}
            onBlur={revisarTelefono}
            required
          />
        </div>
      </div>

      {repetidos.length > 0 && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <p className="font-medium">Ya hay {repetidos.length === 1 ? "un caso" : "casos"} con este teléfono:</p>
          <ul className="mt-1 space-y-0.5">
            {repetidos.map((c) => (
              <li key={c.documentId}>
                <Link href={`/dashboard/operations/${c.documentId}`} className="underline underline-offset-2">
                  {c.caseNumber} · {c.fullName}
                </Link>{" "}
                ({ESTADO_COORDINADOR[c.estado]})
              </li>
            ))}
          </ul>
          <p className="mt-1 text-xs">Si es la misma solicitud, mejor actualiza ese caso. Si es otra, puedes crear este.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="n-procedimiento">Motivo o procedimiento</Label>
          <select
            id="n-procedimiento"
            className={selectClass}
            value={f.medicalService}
            onChange={(e) => set("medicalService", e.target.value)}
          >
            <option value="">Todavía no se sabe</option>
            {procedimientos.map((p) => (
              <option key={p.documentId} value={p.documentId}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        {puedeAsignarCoordinador && (
          <div className="space-y-1.5">
            <Label htmlFor="n-coordinador">Coordinador</Label>
            <SelectEquipo
              id="n-coordinador"
              equipo={equipo}
              value={f.coordinator}
              vacio="Yo (quien lo da de alta)"
              onChange={(v) => set("coordinator", v)}
            />
          </div>
        )}
      </div>

      <CamposProcedencia
        id="n-procedencia"
        valor={f}
        onChange={(cambios) => setF((prev) => ({ ...prev, ...cambios }))}
      />

      <details className="group rounded-lg border p-3">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground group-open:text-foreground">
          Más datos (opcional)
        </summary>
        <div className="mt-3 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="n-ciudad">Ciudad</Label>
            <Input id="n-ciudad" value={f.city} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="n-relato">Qué necesita</Label>
            <Textarea
              id="n-relato"
              rows={4}
              value={f.narrative}
              placeholder="Lo que contó el paciente, con sus palabras."
              onChange={(e) => set("narrative", e.target.value)}
            />
          </div>
        </div>
      </details>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" disabled={enviando}>
          {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
          Crear caso
        </Button>
      </div>
    </form>
  );
}
