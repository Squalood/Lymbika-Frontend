"use client";

import { useState } from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import WhatsAppQrDialog from "@/components/whatsapp-qr-dialog";

function isPhoneNumber(value: string): boolean {
  return /^[+\d\s\-().]+$/.test(value.trim());
}

function toWhatsAppUrl(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}`;
}

interface ContactButtonProps {
  contactButton: string;
  label?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}

export function ContactButton({
  contactButton,
  label = "Agendar valoración",
  className,
  variant = "default",
}: ContactButtonProps) {
  const [open, setOpen] = useState(false);

  if (isPhoneNumber(contactButton)) {
    return (
      <>
        <Button className={`gap-2 ${className ?? ""}`} variant={variant} onClick={() => setOpen(true)}>
          {label} <MoveRight className="w-4 h-4" />
        </Button>
        <WhatsAppQrDialog
          open={open}
          onOpenChange={setOpen}
          url={toWhatsAppUrl(contactButton)}
        />
      </>
    );
  }

  return (
    <BookingDialog
      src={contactButton}
      title={label}
      trigger={
        <Button className={`gap-2 ${className ?? ""}`} variant={variant}>
          {label} <MoveRight className="w-4 h-4" />
        </Button>
      }
    />
  );
}
