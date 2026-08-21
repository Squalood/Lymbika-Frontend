"use client";

import { useState } from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppQrDialog from "@/components/whatsapp-qr-dialog";

interface WhatsAppCtaButtonProps {
  /** URL de wa.me ya armada, con el ?text= incluido. */
  url: string;
  label: string;
  className?: string;
}

/**
 * En movil abre WhatsApp directo: el paciente ya tiene la app con sesion.
 * Desde md se asume una pantalla sin WhatsApp, asi que se muestra el QR
 * para que continue la conversacion en su telefono.
 * Ambas rutas llevan el mismo mensaje prellenado.
 */
export function WhatsAppCtaButton({ url, label, className }: WhatsAppCtaButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button asChild className={`gap-2 md:hidden ${className ?? ""}`}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label} <MoveRight className="w-4 h-4" />
        </a>
      </Button>

      <Button
        className={`gap-2 hidden md:inline-flex ${className ?? ""}`}
        onClick={() => setOpen(true)}
      >
        {label} <MoveRight className="w-4 h-4" />
      </Button>

      <WhatsAppQrDialog open={open} onOpenChange={setOpen} url={url} size={280} />
    </>
  );
}
