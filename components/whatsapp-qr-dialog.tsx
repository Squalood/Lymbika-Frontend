"use client";

import QRCode from "react-qr-code";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WHATSAPP_URL } from "@/lib/constants";

interface WhatsAppQrDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url?: string;
}

export default function WhatsAppQrDialog({ open, onOpenChange, url }: WhatsAppQrDialogProps) {
  const resolvedUrl = url ?? WHATSAPP_URL;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Contáctanos por WhatsApp</DialogTitle>
          <DialogDescription>
            Escanea el código con la cámara de tu teléfono, o abre WhatsApp Web directamente.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <QRCode value={resolvedUrl} size={200} />
        </div>
        <Link
          href={resolvedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 w-full"
        >
          Abrir WhatsApp Web
        </Link>
      </DialogContent>
    </Dialog>
  );
}
