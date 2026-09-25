"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { detectarEmergencia } from "@/lib/case/emergency-detection";
import { crearCaso } from "@/app/data/actions/case-actions";
import { CaseIntent, DocumentsStatus, YesNoUnsure } from "@/types/case";
import { IntakeProgress } from "./intake-progress";
import { OptionList } from "./option-list";
import { EmergencyBanner } from "./emergency-banner";
import { CaseConfirmation } from "./case-confirmation";

const TOTAL_PASOS = 7;
const MAX_NARRATIVA = 2000;
const MAX_ARCHIVOS = 5;
const MAX_BYTES_POR_ARCHIVO = 10 * 1024 * 1024;

const EJEMPLOS = [
  "Me dijeron que necesito operar una hernia.",
  "Me duele mucho la rodilla y no sé con quién ir.",
  "Quiero saber cuánto cuesta una cirugía de columna.",
  "Busco una segunda opinión.",
  "Ya tengo estudios y quiero programar.",
];

const OPCIONES_REVISION: { value: YesNoUnsure; label: string }[] = [
  { value: "yes", label: "Sí, ya me revisó un médico" },
  { value: "no", label: "No, aún no me revisa un médico" },
  { value: "unsure", label: "No estoy seguro" },
];

const OPCIONES_CIRUGIA: { value: YesNoUnsure; label: string }[] = [
  { value: "yes", label: "Sí, me indicaron posible cirugía o procedimiento" },
  { value: "no", label: "No me han indicado cirugía" },
  { value: "unsure", label: "No estoy seguro" },
];

const OPCIONES_DOCUMENTOS: { value: DocumentsStatus; label: string }[] = [
  { value: "upload_now", label: "Sí, quiero subirlos ahora" },
  { value: "send_later", label: "Sí, pero los enviaré después" },
  { value: "none", label: "No tengo estudios" },
];

const OPCIONES_INTENCION: { value: CaseIntent; label: string }[] = [
  { value: "options", label: "Quiero saber mis opciones" },
  { value: "cost", label: "Quiero saber cuánto cuesta" },
  { value: "assessment", label: "Quiero agendar una valoración" },
  { value: "second_opinion", label: "Quiero una segunda opinión" },
  { value: "schedule", label: "Ya quiero programar" },
  { value: "unsure", label: "No estoy seguro, necesito orientación" },
];

type Props = {
  medicalService: { name: string; slug: string } | null;
  utm: Record<string, string>;
};

export function CaseIntakeWizard({ medicalService, utm }: Props) {
  const [paso, setPaso] = useState(1);
  const [narrative, setNarrative] = useState("");
  const [reviewedByDoctor, setReviewedByDoctor] = useState<YesNoUnsure | null>(null);
  const [surgeryIndicated, setSurgeryIndicated] = useState<YesNoUnsure | null>(null);
  const [documentsStatus, setDocumentsStatus] = useState<DocumentsStatus | null>(null);
  const [archivos, setArchivos] = useState<File[]>([]);
  const [errorArchivos, setErrorArchivos] = useState<string | null>(null);
  const [intent, setIntent] = useState<CaseIntent | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{
    caseNumber: string;
    token: string;
    uploadFailed: boolean;
  } | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const primerRender = useRef(true);

  // Al cambiar de paso, regresa al inicio de la tarjeta (en móvil el botón
  // Continuar queda muy abajo). En la carga inicial no se mueve nada.
  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [paso, resultado]);

  const esEmergencia = detectarEmergencia(narrative);

  const pasoValido = (() => {
    switch (paso) {
      case 1:
        return narrative.trim().length >= 3;
      case 2:
        return reviewedByDoctor !== null;
      case 3:
        return surgeryIndicated !== null;
      case 4:
        return (
          documentsStatus !== null &&
          (documentsStatus !== "upload_now" || archivos.length > 0)
        );
      case 5:
        return intent !== null;
      case 6:
        return fullName.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10;
      case 7:
        return consent;
      default:
        return false;
    }
  })();

  function agregarArchivos(lista: FileList | null) {
    if (!lista) return;
    setErrorArchivos(null);
    const nuevos = Array.from(lista);
    const invalido = nuevos.find(
      (f) => !(f.type.startsWith("image/") || f.type === "application/pdf")
    );
    if (invalido) {
      setErrorArchivos("Solo se aceptan imágenes o PDF.");
      return;
    }
    if (nuevos.some((f) => f.size > MAX_BYTES_POR_ARCHIVO)) {
      setErrorArchivos("Cada archivo debe pesar máximo 10 MB.");
      return;
    }
    const combinados = [...archivos, ...nuevos];
    if (combinados.length > MAX_ARCHIVOS) {
      setErrorArchivos(`Puedes subir máximo ${MAX_ARCHIVOS} archivos.`);
      return;
    }
    setArchivos(combinados);
  }

  async function subirArchivos(token: string) {
    const formData = new FormData();
    archivos.forEach((archivo) => formData.append("files", archivo));
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cases/by-token/${token}/documents`,
        { method: "POST", body: formData }
      );
      return res.ok;
    } catch {
      return false;
    }
  }

  async function enviar() {
    if (!reviewedByDoctor || !surgeryIndicated || !documentsStatus || !intent) return;
    setEnviando(true);
    setErrorEnvio(null);

    const landingPath = (() => {
      try {
        const referrer = new URL(document.referrer);
        return referrer.origin === window.location.origin ? referrer.pathname : undefined;
      } catch {
        return undefined;
      }
    })();

    const respuesta = await crearCaso({
      narrative,
      reviewedByDoctor,
      surgeryIndicated,
      documentsStatus,
      intent,
      fullName,
      phone,
      city,
      consent,
      medicalServiceSlug: medicalService?.slug,
      landingPath,
      utm: Object.keys(utm).length > 0 ? utm : undefined,
      website,
    });

    if (!respuesta.ok) {
      setErrorEnvio(respuesta.error);
      setEnviando(false);
      return;
    }

    const subio =
      documentsStatus === "upload_now" && archivos.length > 0
        ? await subirArchivos(respuesta.token)
        : true;

    setResultado({
      caseNumber: respuesta.caseNumber,
      token: respuesta.token,
      uploadFailed: !subio,
    });
    setEnviando(false);
  }

  if (resultado) {
    return (
      <div ref={topRef} className="scroll-mt-24">
        <CaseConfirmation {...resultado} />
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-24 space-y-8">
      <header className="space-y-3 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-primary">LYMBIKA</p>
        <h1 className="text-3xl font-bold">Coordinar mi caso</h1>
        {medicalService && (
          <p className="text-muted-foreground">
            Procedimiento: <span className="text-foreground">{medicalService.name}</span>
          </p>
        )}
        <p className="mx-auto max-w-xl text-sm text-muted-foreground">
          No necesitas saber términos médicos. Cuéntanos qué está pasando y te ayudamos a
          organizar el siguiente paso.
        </p>
      </header>

      <div className="rounded-2xl border bg-card p-5 md:p-8 space-y-6 shadow-sm">
        <IntakeProgress step={paso} total={TOTAL_PASOS} />

        {paso === 1 && (
          <section className="space-y-4">
            <PasoTitulo
              titulo={
                medicalService
                  ? `Cuéntanos un poco sobre tu caso de ${medicalService.name}.`
                  : "¿Qué necesitas resolver?"
              }
              descripcion="Cuéntanos con tus propias palabras qué te está pasando, qué te dijeron o qué estás buscando. No necesitas usar términos médicos."
            />
            <div className="space-y-1">
              <Textarea
                value={narrative}
                onChange={(e) => setNarrative(e.target.value.slice(0, MAX_NARRATIVA))}
                rows={5}
                className="text-base"
                aria-label="Describe tu caso"
                autoFocus
              />
              <p className="text-right text-xs text-muted-foreground">
                {narrative.length}/{MAX_NARRATIVA}
              </p>
            </div>
            {esEmergencia && <EmergencyBanner />}
            <div className="flex flex-wrap gap-2">
              {EJEMPLOS.map((ejemplo) => (
                <button
                  key={ejemplo}
                  type="button"
                  onClick={() => setNarrative(ejemplo)}
                  className="rounded-full border px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {ejemplo}
                </button>
              ))}
            </div>
          </section>
        )}

        {paso === 2 && (
          <section className="space-y-4">
            <PasoTitulo titulo="¿Ya te revisó un médico?" />
            <OptionList
              options={OPCIONES_REVISION}
              value={reviewedByDoctor}
              onChange={setReviewedByDoctor}
            />
          </section>
        )}

        {paso === 3 && (
          <section className="space-y-4">
            <PasoTitulo titulo="¿Te dijeron que podrías necesitar cirugía o algún procedimiento?" />
            <OptionList
              options={OPCIONES_CIRUGIA}
              value={surgeryIndicated}
              onChange={setSurgeryIndicated}
            />
          </section>
        )}

        {paso === 4 && (
          <section className="space-y-4">
            <PasoTitulo titulo="¿Tienes estudios, receta, indicación médica o algún documento?" />
            <OptionList
              options={OPCIONES_DOCUMENTOS}
              value={documentsStatus}
              onChange={setDocumentsStatus}
            />
            {documentsStatus === "upload_now" && (
              <div className="space-y-3 rounded-xl border border-dashed p-4">
                <Label
                  htmlFor="case-files"
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium text-primary"
                >
                  <Paperclip className="h-4 w-4" />
                  Seleccionar archivos (imágenes o PDF, máx. {MAX_ARCHIVOS})
                </Label>
                <input
                  id="case-files"
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  className="sr-only"
                  onChange={(e) => {
                    agregarArchivos(e.target.files);
                    e.target.value = "";
                  }}
                />
                {archivos.length > 0 && (
                  <ul className="space-y-2">
                    {archivos.map((archivo, i) => (
                      <li
                        key={`${archivo.name}-${i}`}
                        className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm"
                      >
                        <span className="truncate">{archivo.name}</span>
                        <button
                          type="button"
                          aria-label={`Quitar ${archivo.name}`}
                          onClick={() => setArchivos(archivos.filter((_, j) => j !== i))}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {errorArchivos && <p className="text-sm text-red-600">{errorArchivos}</p>}
              </div>
            )}
          </section>
        )}

        {paso === 5 && (
          <section className="space-y-4">
            <PasoTitulo titulo="¿Qué te gustaría resolver primero?" />
            <OptionList options={OPCIONES_INTENCION} value={intent} onChange={setIntent} />
          </section>
        )}

        {paso === 6 && (
          <section className="space-y-4">
            <PasoTitulo titulo="Tus datos de contacto" />
            <div className="space-y-2">
              <Label htmlFor="case-name">Nombre completo</Label>
              <Input
                id="case-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                maxLength={120}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="case-phone">WhatsApp / teléfono</Label>
              <Input
                id="case-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+52 656 000 0000"
                autoComplete="tel"
                maxLength={30}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="case-city">Ciudad</Label>
              <Input
                id="case-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
                maxLength={120}
              />
            </div>
            {/* Honeypot: invisible para personas, los bots lo llenan. */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
          </section>
        )}

        {paso === 7 && (
          <section className="space-y-4">
            <PasoTitulo titulo="Último paso" />
            <div className="flex items-start gap-3">
              <Checkbox
                id="case-consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                className="mt-0.5"
              />
              <Label htmlFor="case-consent" className="text-sm font-normal leading-relaxed">
                Acepto que Lymbika me contacte para dar seguimiento a mi solicitud.
              </Label>
            </div>
            <Link
              href="/privacidad"
              target="_blank"
              className="inline-block text-sm text-primary underline underline-offset-4"
            >
              Aviso de privacidad
            </Link>
            {errorEnvio && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorEnvio}</p>
            )}
          </section>
        )}

        <div
          className={cn(
            "flex items-center gap-3",
            paso > 1 ? "justify-between" : "justify-end"
          )}
        >
          {paso > 1 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPaso(paso - 1)}
              disabled={enviando}
            >
              Atrás
            </Button>
          )}
          {paso < TOTAL_PASOS ? (
            <Button
              type="button"
              size="lg"
              className="font-semibold"
              onClick={() => setPaso(paso + 1)}
              disabled={!pasoValido}
            >
              Continuar
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              className="font-semibold"
              onClick={enviar}
              disabled={!pasoValido || enviando}
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" />}
              Enviar y coordinar mi caso
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Lymbika coordina atención y opciones médicas. Esta herramienta no sustituye una
          valoración profesional.
        </p>
      </div>
    </div>
  );
}

function PasoTitulo({ titulo, descripcion }: { titulo: string; descripcion?: string }) {
  return (
    <div className="space-y-1">
      <h2 className="font-semibold">{titulo}</h2>
      {descripcion && <p className="text-sm text-muted-foreground">{descripcion}</p>}
    </div>
  );
}
