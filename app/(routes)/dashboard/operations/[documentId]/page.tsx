import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  catalogosDelCaso,
  doctorAsignado,
  listarEquipo,
  obtenerCaso,
} from "@/app/data/services/case-admin-service";
import {
  ESTUDIOS_PACIENTE,
  INTENCION_PACIENTE,
  ORIGEN,
  RESPUESTA_SI_NO,
  SIN_REGISTRAR,
} from "@/lib/case/labels";
import { enlaceWhatsApp, haceCuanto, hoyEnJuarez } from "@/lib/case/operations";
import { formatLongDate } from "@/lib/format-date";
import { EstadoBadge, PrioridadBadge, UrgenteBadge } from "../components/estado-badge";
import { CopiarEnlace } from "../components/copiar-enlace";
import { DocumentosCaso } from "../components/documentos-caso";
import { EditorCaso } from "../components/editor-caso";
import { PanelRapido } from "../components/panel-rapido";

type Props = {
  params: Promise<{ documentId: string }>;
};

function Dato({ label, valor }: { label: string; valor?: string | null }) {
  if (!valor) return null;
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{valor}</dd>
    </div>
  );
}

export default async function CasoOperacionPage({ params }: Props) {
  const { documentId } = await params;
  const [caso, catalogos, doctor, equipo] = await Promise.all([
    obtenerCaso(documentId),
    catalogosDelCaso(),
    doctorAsignado(),
    listarEquipo(),
  ]);
  if (!caso) notFound();

  const token = caso.patientLink?.split("/case/")[1] ?? null;
  const origen = caso.originType
    ? [ORIGEN[caso.originType], caso.originDetail].filter(Boolean).join(": ")
    : `Origen ${SIN_REGISTRAR.toLowerCase()}`;

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/operations"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Bandeja
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{caso.fullName}</h1>
            <EstadoBadge estado={caso.estado} />
            <PrioridadBadge prioridad={caso.priority} />
            {caso.emergencyFlag && <UrgenteBadge />}
          </div>
          <p className="text-sm text-muted-foreground">
            {caso.caseNumber} · {origen} · recibido {haceCuanto(caso.createdAt)} · última
            gestión {haceCuanto(caso.updatedAt)}
          </p>
        </div>
        {/* En el teléfono: WhatsApp a lo ancho y los otros dos lado a lado. */}
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <Button asChild size="sm" className="col-span-2 bg-green-600 hover:bg-green-700">
            <a
              href={enlaceWhatsApp(
                caso.phone,
                `Hola ${caso.fullName.split(" ")[0]}, te escribimos de Lymbika sobre tu caso ${caso.caseNumber}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Button>
          {caso.patientLink && (
            <>
              <CopiarEnlace enlace={caso.patientLink} />
              <Button asChild size="sm" variant="outline">
                <a href={caso.patientLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" /> Ver como paciente
                </a>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Dónde está, qué sigue, quién y cuándo: se actualiza sin abrir el expediente. */}
      <PanelRapido
        key={`panel-${caso.updatedAt}`}
        caso={caso}
        equipo={equipo}
        puedeAsignarCoordinador={!doctor}
        hoy={hoyEnJuarez()}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Lo que llenó el paciente: solo lectura */}
        <div className="space-y-4">
          <section className="space-y-4 rounded-xl border bg-background p-5">
            <h2 className="font-semibold">Lo que nos contó</h2>
            {caso.emergencyFlag && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                El relato menciona palabras de alarma. Contactar hoy.
              </p>
            )}
            {caso.narrative?.trim() ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{caso.narrative}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Sin relato registrado.</p>
            )}
            <dl className="grid gap-3 sm:grid-cols-2">
              <Dato label="Procedimiento" valor={caso.medical_service?.name?.trim()} />
              <Dato label="¿Ya lo revisó un médico?" valor={RESPUESTA_SI_NO[caso.reviewedByDoctor ?? ""]} />
              <Dato label="¿Le indicaron cirugía?" valor={RESPUESTA_SI_NO[caso.surgeryIndicated ?? ""]} />
              <Dato label="Estudios" valor={ESTUDIOS_PACIENTE[caso.documentsStatus ?? ""]} />
              <Dato label="Quiere resolver primero" valor={INTENCION_PACIENTE[caso.intent ?? ""]} />
              <Dato label="Ciudad" valor={caso.city} />
              <Dato label="Página de origen" valor={caso.landingPath} />
              <Dato
                label="Aceptó ser contactado"
                valor={caso.consentAt ? formatLongDate(caso.consentAt) : null}
              />
            </dl>
          </section>

          <section className="space-y-4 rounded-xl border bg-background p-5">
            <h2 className="font-semibold">Documentos</h2>
            <DocumentosCaso documentos={caso.documents ?? []} token={token} />
          </section>
        </div>

        {/* Lo que edita coordinación */}
        <EditorCaso
          key={caso.updatedAt}
          caso={caso}
          doctores={catalogos.doctores}
          hospitales={catalogos.hospitales}
          procedimientos={catalogos.procedimientos}
          puedeReasignar={!doctor}
          puedeVerFinanzas={!doctor}
        />
      </div>
    </div>
  );
}
