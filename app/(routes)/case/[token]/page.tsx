import { notFound } from "next/navigation";
import { CheckCircle2, Circle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatientCaseType } from "@/types/case";
import { ESTADO_PACIENTE, siguientePasoPaciente } from "@/lib/case/labels";
import { formatPrice } from "@/lib/formatPrice";
import { formatLongDate } from "@/lib/formatDate";
import { getSiteConfig } from "@/lib/strapi/pages";
import { whatsappLink } from "@/lib/site-config";

type Props = {
  params: Promise<{ token: string }>;
};

async function getCaseByToken(token: string): Promise<PatientCaseType | null> {
  // Mismo formato que valida el backend: evita pegarle con basura.
  if (!/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cases/by-token/${token}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return (await res.json()) as PatientCaseType;
  } catch {
    return null;
  }
}

// `quoteValidUntil` es una fecha sin hora ("2026-10-01"). Parseada tal cual es
// medianoche UTC, que en Ciudad Juárez ya es el día anterior.
function fechaSinHora(fecha: string | null) {
  return fecha ? formatLongDate(`${fecha}T12:00:00Z`) : null;
}

export default async function MiCasoPage({ params }: Props) {
  const { token } = await params;
  const [caso, config] = await Promise.all([getCaseByToken(token), getSiteConfig()]);
  if (!caso) notFound();

  const whatsappUrl = whatsappLink(
    config.whatsappNumber,
    `Hola, mi número de caso es ${caso.caseNumber}.`
  );

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-primary">LYMBIKA</p>
          <h1 className="text-3xl font-bold">Mi Caso Lymbika</h1>
          <p className="text-sm text-muted-foreground">Caso {caso.caseNumber}</p>
        </header>

        <div className="rounded-2xl border bg-card p-5 md:p-8 shadow-sm divide-y">
          {caso.medicalService && (
            <Fila titulo="Procedimiento">
              <p className="text-lg font-bold">{caso.medicalService.name.trim()}</p>
            </Fila>
          )}

          <Fila titulo="Estado">
            <p>{ESTADO_PACIENTE[caso.estado]}</p>
          </Fila>

          <Fila titulo="Siguiente paso">
            <p>{siguientePasoPaciente(caso.estado, caso.patientNextStep)}</p>
          </Fila>

          {caso.doctor && (
            <Fila titulo="Especialista">
              <p className="font-medium">{caso.doctor.doctorName.trim()}</p>
            </Fila>
          )}

          {caso.quote && caso.quote.amount != null && (
            <Fila titulo="Cotización">
              <p className="text-lg font-bold">{formatPrice(caso.quote.amount)}</p>
              {fechaSinHora(caso.quote.validUntil) && (
                <p className="text-sm text-muted-foreground">
                  Vigente hasta el {fechaSinHora(caso.quote.validUntil)}
                </p>
              )}
            </Fila>
          )}

          {(caso.surgery || caso.hospital) && (
            <Fila titulo="Programación">
              {caso.surgery && (
                <p className="font-medium">
                  {formatLongDate(caso.surgery.date)}
                  {!caso.surgery.confirmed && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (fecha tentativa)
                    </span>
                  )}
                </p>
              )}
              {caso.hospital && (
                <p className="text-sm text-muted-foreground">
                  {caso.hospital.hospitalName.trim()}
                </p>
              )}
            </Fila>
          )}

          {caso.documents.length > 0 && (
            <Fila titulo="Documentos">
              <ul className="space-y-2">
                {caso.documents.map((doc, i) => (
                  <li key={`${doc.name}-${i}`} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{doc.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {doc.mime === "application/pdf" ? "PDF" : "Imagen"}
                    </span>
                  </li>
                ))}
              </ul>
            </Fila>
          )}

          {caso.followUpTasks.length > 0 && (
            <Fila titulo="Seguimiento">
              <ul className="space-y-2">
                {caso.followUpTasks.map((tarea, i) => (
                  <li key={`${tarea.title}-${i}`} className="flex items-start gap-2 text-sm">
                    {tarea.done ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className={tarea.done ? "text-muted-foreground line-through" : ""}>
                      {tarea.title}
                    </span>
                  </li>
                ))}
              </ul>
            </Fila>
          )}
        </div>

        <Button asChild size="lg" className="w-full font-semibold">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Hablar con Lymbika por WhatsApp
          </a>
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Lymbika coordina atención y opciones médicas. Esta herramienta no sustituye una
          valoración profesional.
        </p>
      </div>
    </main>
  );
}

function Fila({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1 py-4 first:pt-0 last:pb-0">
      <p className="text-xs font-semibold text-muted-foreground">{titulo}</p>
      {children}
    </section>
  );
}
