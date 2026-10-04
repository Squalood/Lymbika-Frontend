"use client";

import { useState } from "react";
import WhatsAppQrDialog from "@/components/whatsapp-qr-dialog";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { BTN_WHATS, whatsappIcon } from "./ui";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola. Quiero contarles qué está pasando."
)}`;

/** Cierre de la página: la promesa y el atajo a WhatsApp. */
export function ContactCard() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const isDesktop = useIsDesktop();

  return (
    <section className="rounded-[22px] bg-[#0C1848] p-6 text-center">
      <div className="space-y-1 text-[17px] font-medium leading-[1.45] text-white">
        <p>Cuéntanos qué está pasando.</p>
        <p>Te ayudamos a entender qué sigue.</p>
        <p className="text-[#A9B6E8]">Cuando decides avanzar, coordinamos lo difícil.</p>
      </div>
      <p className="mt-4 text-sm font-light text-[#C9D2F0]">
        ¿Prefieres escribirnos? Del otro lado de WhatsApp hay un médico que te escucha.
      </p>

      <div className="mt-5">
        {isDesktop ? (
          <button type="button" onClick={() => setQrDialogOpen(true)} className={BTN_WHATS}>
            {whatsappIcon}
            Hablar con Lymbika
          </button>
        ) : (
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={BTN_WHATS}
          >
            {whatsappIcon}
            Hablar con Lymbika
          </a>
        )}
      </div>

      <p className="mt-5 text-[11px] uppercase tracking-[0.12em] text-[#8A90AE]">
        Lymbika Health · Acompañamiento de salud · Ciudad Juárez
      </p>

      <WhatsAppQrDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} url={WHATSAPP_LINK} />
    </section>
  );
}
