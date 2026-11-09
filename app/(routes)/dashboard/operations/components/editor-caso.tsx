"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { guardarCaso, type CasoEditable } from "@/app/data/actions/case-admin-actions";
import { SIGUIENTE_PASO_PACIENTE } from "@/lib/case/labels";
import { inputLocalAIso, isoAInputLocal } from "@/lib/case/operations";
import { AdminCaseType, OpcionCatalogo } from "@/types/case";
import { CamposProcedencia, Campo, Casilla, Seccion, selectClass, type Procedencia } from "./campos";

type Props = {
  caso: AdminCaseType;
  doctores: OpcionCatalogo[];
  hospitales: OpcionCatalogo[];
  procedimientos: OpcionCatalogo[];
  /** false para un especialista: Strapi descarta el cambio de `selected_doctor`. */
  puedeReasignar: boolean;
  /** false para un especialista: Strapi no le manda ni le acepta notas internas ni cotización. */
  puedeVerFinanzas: boolean;
};

/**
 * Expediente completo, salvo lo que va en el panel rápido de arriba (estado,
 * prioridad, próxima acción, responsables).
 */
export function EditorCaso({
  caso,
  doctores,
  hospitales,
  procedimientos,
  puedeReasignar,
  puedeVerFinanzas,
}: Props) {
  const router = useRouter();
  const [guardando, startTransition] = useTransition();
  const [cambios, setCambios] = useState(false);

  const [f, setF] = useState(() => ({
    patientNextStep: caso.patientNextStep ?? "",
    internalNotes: caso.internalNotes ?? "",
    fullName: caso.fullName,
    phone: caso.phone,
    city: caso.city ?? "",
    emergencyFlag: Boolean(caso.emergencyFlag),
    medicalService: caso.medical_service?.documentId ?? "",
    doctor: caso.selected_doctor?.documentId ?? "",
    hospital: caso.hospital?.documentId ?? "",
    quoteAmount: caso.quoteAmount != null ? String(caso.quoteAmount) : "",
    quoteValidUntil: caso.quoteValidUntil ?? "",
    quotePresented: Boolean(caso.quotePresented),
    surgeryDate: isoAInputLocal(caso.surgeryDate),
    surgeryDateConfirmed: Boolean(caso.surgeryDateConfirmed),
    followUpTasks: (caso.followUpTasks ?? []).map((t) => ({ title: t.title, done: Boolean(t.done) })),
    originType: (caso.originType ?? "") as Procedencia["originType"],
    originDetail: caso.originDetail ?? "",
    channel: (caso.channel ?? "") as Procedencia["channel"],
    referredBy: (caso.referredBy ?? "") as Procedencia["referredBy"],
    isTest: Boolean(caso.isTest),
  }));

  function set<K extends keyof typeof f>(campo: K, valor: (typeof f)[K]) {
    setF((prev) => ({ ...prev, [campo]: valor }));
    setCambios(true);
  }

  function guardar() {
    const monto = f.quoteAmount.trim() === "" ? null : Number(f.quoteAmount);
    if (monto !== null && (Number.isNaN(monto) || monto < 0)) {
      toast.error("La cotización debe ser un número.");
      return;
    }
    if (f.quotePresented && monto === null) {
      toast.error("Para mostrar la cotización al paciente, escribe el monto.");
      return;
    }

    const datos: CasoEditable = {
      patientNextStep: f.patientNextStep,
      internalNotes: f.internalNotes,
      fullName: f.fullName,
      phone: f.phone,
      city: f.city,
      emergencyFlag: f.emergencyFlag,
      medicalService: f.medicalService || null,
      doctor: f.doctor || null,
      hospital: f.hospital || null,
      quoteAmount: monto,
      quoteValidUntil: f.quoteValidUntil || null,
      quotePresented: f.quotePresented,
      surgeryDate: inputLocalAIso(f.surgeryDate),
      surgeryDateConfirmed: f.surgeryDateConfirmed,
      followUpTasks: f.followUpTasks.filter((t) => t.title.trim()),
      originType: f.originType || null,
      originDetail: f.originDetail,
      channel: f.channel || null,
      referredBy: f.referredBy || null,
      isTest: f.isTest,
    };

    startTransition(async () => {
      const resultado = await guardarCaso(caso.documentId, datos);
      if (resultado.ok) {
        toast.success("Caso guardado. El paciente ya ve los cambios en Mi caso.");
        setCambios(false);
        router.refresh();
      } else {
        toast.error(resultado.error);
      }
    });
  }

  return (
    <div className="space-y-4">
      <Seccion titulo="Comunicación">
        <Campo
          label="Siguiente paso (lo ve el paciente)"
          htmlFor="siguiente"
          ayuda="Si lo dejas vacío, el paciente ve el texto automático del estado."
        >
          <Textarea
            id="siguiente"
            rows={2}
            value={f.patientNextStep}
            placeholder={SIGUIENTE_PASO_PACIENTE[caso.estado]}
            onChange={(e) => set("patientNextStep", e.target.value)}
          />
        </Campo>
        {puedeVerFinanzas && (
          <Campo
            label="Notas internas"
            htmlFor="notas"
            ayuda="Para excepciones y contexto. No las ven el paciente ni el especialista."
          >
            <Textarea
              id="notas"
              rows={4}
              value={f.internalNotes}
              onChange={(e) => set("internalNotes", e.target.value)}
            />
          </Campo>
        )}
        <Casilla id="emergencia" checked={f.emergencyFlag} onChange={(v) => set("emergencyFlag", v)}>
          Posible emergencia
        </Casilla>
      </Seccion>

      <Seccion titulo="Datos del paciente">
        <div className="grid gap-4 sm:grid-cols-3">
          <Campo label="Nombre" htmlFor="nombre">
            <Input id="nombre" value={f.fullName} onChange={(e) => set("fullName", e.target.value)} />
          </Campo>
          <Campo label="WhatsApp / teléfono" htmlFor="telefono">
            <Input id="telefono" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
          </Campo>
          <Campo label="Ciudad" htmlFor="ciudad">
            <Input id="ciudad" value={f.city} onChange={(e) => set("city", e.target.value)} />
          </Campo>
        </div>
        <Campo label="Procedimiento" htmlFor="procedimiento">
          <select
            id="procedimiento"
            className={selectClass}
            value={f.medicalService}
            onChange={(e) => set("medicalService", e.target.value)}
          >
            <option value="">Sin procedimiento</option>
            {procedimientos.map((p) => (
              <option key={p.documentId} value={p.documentId}>
                {p.label}
              </option>
            ))}
          </select>
        </Campo>
      </Seccion>

      <Seccion titulo="Procedencia">
        <CamposProcedencia
          id="procedencia"
          valor={f}
          onChange={(cambios) => {
            setF((prev) => ({ ...prev, ...cambios }));
            setCambios(true);
          }}
        />
        <Casilla id="prueba" checked={f.isTest} onChange={(v) => set("isTest", v)}>
          Caso de prueba (no aparece en la bandeja ni cuenta en los números)
        </Casilla>
      </Seccion>

      <Seccion titulo="Plan">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo
            label="Especialista"
            htmlFor="doctor"
            ayuda={
              puedeReasignar
                ? "El paciente lo ve en Mi caso."
                : "Para reasignar el caso, pídelo a coordinación."
            }
          >
            <select
              id="doctor"
              className={selectClass}
              disabled={!puedeReasignar}
              value={f.doctor}
              onChange={(e) => set("doctor", e.target.value)}
            >
              <option value="">Sin asignar</option>
              {doctores.map((d) => (
                <option key={d.documentId} value={d.documentId}>
                  {d.label}
                </option>
              ))}
            </select>
          </Campo>
          <Campo label="Hospital" htmlFor="hospital" ayuda="El paciente lo ve en Mi caso.">
            <select
              id="hospital"
              className={selectClass}
              value={f.hospital}
              onChange={(e) => set("hospital", e.target.value)}
            >
              <option value="">Sin asignar</option>
              {hospitales.map((h) => (
                <option key={h.documentId} value={h.documentId}>
                  {h.label}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        {puedeVerFinanzas && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo label="Cotización (MXN)" htmlFor="monto">
                <Input
                  id="monto"
                  inputMode="decimal"
                  value={f.quoteAmount}
                  placeholder="Sin registrar"
                  onChange={(e) => set("quoteAmount", e.target.value)}
                />
              </Campo>
              <Campo label="Vigente hasta" htmlFor="vigencia">
                <Input
                  id="vigencia"
                  type="date"
                  value={f.quoteValidUntil}
                  onChange={(e) => set("quoteValidUntil", e.target.value)}
                />
              </Campo>
            </div>
            <Casilla
              id="mostrar-cotizacion"
              checked={f.quotePresented}
              onChange={(v) => set("quotePresented", v)}
            >
              Mostrar la cotización al paciente
            </Casilla>
          </>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Campo label="Fecha de cirugía" htmlFor="fecha" ayuda="Hora de Ciudad Juárez.">
            <Input
              id="fecha"
              type="datetime-local"
              value={f.surgeryDate}
              onChange={(e) => set("surgeryDate", e.target.value)}
            />
          </Campo>
          <div className="flex sm:items-end sm:pb-6">
            <Casilla
              id="fecha-confirmada"
              checked={f.surgeryDateConfirmed}
              onChange={(v) => set("surgeryDateConfirmed", v)}
            >
              Fecha confirmada (si no, el paciente la ve como tentativa)
            </Casilla>
          </div>
        </div>
      </Seccion>

      <Seccion titulo="Tareas de seguimiento">
        <p className="-mt-2 text-xs text-muted-foreground">
          El paciente ve esta lista y cuáles están hechas.
        </p>
        {f.followUpTasks.length > 0 && (
          <ul className="space-y-2">
            {f.followUpTasks.map((tarea, i) => (
              <li key={i} className="flex items-center gap-2">
                <Checkbox
                  checked={tarea.done}
                  aria-label="Hecha"
                  onCheckedChange={(v) =>
                    set(
                      "followUpTasks",
                      f.followUpTasks.map((t, j) => (j === i ? { ...t, done: v === true } : t))
                    )
                  }
                />
                <Input
                  value={tarea.title}
                  placeholder="Ej. Enviar estudios preoperatorios"
                  onChange={(e) =>
                    set(
                      "followUpTasks",
                      f.followUpTasks.map((t, j) => (j === i ? { ...t, title: e.target.value } : t))
                    )
                  }
                />
                <button
                  type="button"
                  aria-label="Quitar tarea"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    set(
                      "followUpTasks",
                      f.followUpTasks.filter((_, j) => j !== i)
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          onClick={() => set("followUpTasks", [...f.followUpTasks, { title: "", done: false }])}
        >
          <Plus className="h-4 w-4" /> Agregar tarea
        </button>
      </Seccion>

      <div className="sticky bottom-0 z-10 -mx-4 flex items-center justify-end gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:p-3">
        {cambios && <span className="text-sm text-muted-foreground">Cambios sin guardar</span>}
        <Button type="button" onClick={guardar} disabled={guardando || !cambios}>
          {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
          Guardar cambios
        </Button>
      </div>
    </div>
  );
}
