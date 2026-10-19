"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import WhatsAppQrDialog from "./whatsapp-qr-dialog";
import { useSiteConfig } from "@/components/site-config-provider";
import { whatsappLink } from "@/lib/site-config";

interface WhatsAppTriggerProps {
  url?: string;
  className?: string;
  children: React.ReactNode;
}

export default function WhatsAppTrigger({ url, className, children }: WhatsAppTriggerProps) {
  const { whatsappNumber } = useSiteConfig();
  const isDesktop = useIsDesktop();
  const [dialogOpen, setDialogOpen] = useState(false);
  const resolvedUrl = url ?? whatsappLink(whatsappNumber);

  if (isDesktop) {
    return (
      <>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className={cn("bg-transparent border-0 p-0 cursor-pointer", className)}
        >
          {children}
        </button>
        <WhatsAppQrDialog open={dialogOpen} onOpenChange={setDialogOpen} url={resolvedUrl} />
      </>
    );
  }

  return (
    <a href={resolvedUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
