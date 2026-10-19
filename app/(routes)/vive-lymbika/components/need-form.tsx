"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, TriangleAlert } from "lucide-react";
import WhatsAppQrDialog from "@/components/whatsapp-qr-dialog";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { useSiteConfig } from "@/components/site-config-provider";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { detectarEmergencia } from "@/lib/case/emergency-detection";
import { CATEGORIES, FAMILY_OPTIONS, type CategoryKey } from "./categories";
import { EmergencyCard } from "./emergency-card";
import { BTN_LINK, BTN_WHATS, HEADING, LEDE, Pill, rise, whatsappIcon } from "./ui";

// Un mensaje largo vuelve el QR de escritorio demasiado denso para escanearlo.
const MAX_RELATO = 500;

const LABEL = "mb-2 mt-6 block text-[15px] font-semibold text-[#0C1848]";
const INPUT =
  "w-full rounded-xl border-[1.5px] border-[#E5E9F4] bg-white px-3.5 py-3 text-base text-[#0C1848] placeholder:text-[#A3A9C2] focus:border-[#1A3CBF]/50 focus:outline-none";

type Props = {
  categoria: CategoryKey | null;
  onClearCategoria: () => void;
};

function armarMensaje(
  categoria: CategoryKey | null,
  familiar: string,
  nombre: string,
  relato: string
) {
  const lineas = [nombre.trim() ? `Hola, soy ${nombre.trim()}.` : "Hola."];
  if (categoria) lineas.push(`Necesito ayuda con: ${CATEGORIES[categoria].label}.`);
  if (familiar !== "Para mí") lineas.push(`Es para: ${familiar}.`);
  lineas.push("", relato.trim());
  return lineas.join("\n");
}

/**
 * Formulario estático: no guarda nada. Arma el mensaje y lo abre en WhatsApp
 * (en escritorio, como QR para seguir desde el celular).
 */
export function NeedForm({ categoria, onClearCategoria }: Props) {
  const [relato, setRelato] = useState("");
  const [familiar, setFamiliar] = useState(categoria === "familiar" ? "" : "Para mí");
  const [nombre, setNombre] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const isDesktop = useIsDesktop();
  const { whatsappNumber } = useSiteConfig();

  const placeholder = CATEGORIES[categoria ?? "nose"].placeholder;
  const esEmergencia = detectarEmergencia(relato);

  const faltante = (() => {
    if (relato.trim().length < 3) return "Cuéntanos con tus palabras qué está pasando.";
    if (!familiar) return "Dinos si es para ti o para alguien de tu familia.";
    return null;
  })();

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (faltante) return;
    const url = whatsappLink(whatsappNumber, armarMensaje(categoria, familiar, nombre, relato));
    if (isDesktop) setQrUrl(url);
    else window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <motion.form {...rise(0.05)} onSubmit={enviar} noValidate>
      {categoria && (
        <div className="mb-4 flex items-center gap-3">
          <Pill>{CATEGORIES[categoria].label}</Pill>
          <button type="button" onClick={onClearCategoria} className={BTN_LINK}>
            Cambiar
          </button>
        </div>
      )}

      <h1 className={HEADING}>Cuéntanos qué está pasando.</h1>
      <p className={`${LEDE} mt-3`}>
        No necesitas saber qué especialista buscar ni qué estudio pedir.
      </p>

      <label htmlFor="vive-relato" className={LABEL}>
        Con tus palabras
      </label>
      <textarea
        id="vive-relato"
        value={relato}
        onChange={(e) => setRelato(e.target.value.slice(0, MAX_RELATO))}
        placeholder={placeholder}
        rows={5}
        className={cn(INPUT, "min-h-[130px] resize-y")}
      />
      <p className="mt-1 text-right text-xs text-[#8A90AE]">
        {relato.length}/{MAX_RELATO}
      </p>

      {esEmergencia && (
        <div
          role="alert"
          className="mt-3 flex gap-3 rounded-2xl bg-[#FDECEC] p-4 text-sm text-[#9B1C1C]"
        >
          <TriangleAlert className="h-5 w-5 shrink-0" />
          <p>
            <b className="font-semibold">Si es una emergencia, llama al 911 o acude a urgencias.</b>{" "}
            Lymbika coordina atención programada y no atiende emergencias. Si no es urgente,
            puedes continuar.
          </p>
        </div>
      )}

      <span className={LABEL}>¿Es para ti o para alguien de tu familia?</span>
      <div className="flex flex-wrap gap-2" role="group" aria-label="¿Para quién es?">
        {FAMILY_OPTIONS.map((opcion) => (
          <button
            key={opcion}
            type="button"
            aria-pressed={familiar === opcion}
            onClick={() => setFamiliar(opcion)}
            className={cn(
              "rounded-full border-[1.5px] px-4 py-2 text-[15px] font-medium transition-colors",
              familiar === opcion
                ? "border-[#1A3CBF] bg-[#EEF2FD] text-[#1A3CBF]"
                : "border-[#E5E9F4] bg-white text-[#0C1848] hover:border-[#1A3CBF]/35"
            )}
          >
            {opcion}
          </button>
        ))}
      </div>

      <label htmlFor="vive-nombre" className={LABEL}>
        Tu nombre <span className="font-normal text-[#8A90AE]">(opcional)</span>
      </label>
      <input
        id="vive-nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
        autoComplete="name"
        maxLength={80}
        className={INPUT}
      />

      <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-[#F2F5FD] p-4 text-sm leading-relaxed text-[#4A5170]">
        <Paperclip className="mt-0.5 h-4 w-4 shrink-0 text-[#1A3CBF]" />
        Si tienes estudios, receta, cotización o un audio, mándalos en el mismo chat de
        WhatsApp.
      </p>

      <button type="submit" disabled={!!faltante} className={`${BTN_WHATS} mt-6`}>
        {whatsappIcon}
        Enviar por WhatsApp
      </button>
      {faltante && <p className="mt-2 text-center text-sm text-[#8A90AE]">{faltante}</p>}

      <div className="mt-10">
        <EmergencyCard />
      </div>

      <WhatsAppQrDialog
        open={qrUrl !== null}
        onOpenChange={(open) => !open && setQrUrl(null)}
        url={qrUrl ?? undefined}
        size={260}
      />
    </motion.form>
  );
}
