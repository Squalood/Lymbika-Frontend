"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import * as gtag from "@/lib/gtag";

type Props = {
  scheduleLink: string;
  contactWhatsappLink: string;
  label: string;
};

export default function FloatingCta({ scheduleLink, contactWhatsappLink, label }: Props) {
  const handleSchedule = () => {
    gtag.event({
      action: "click_schedule",
      category: "engagement",
      label: "CTA flotante movil - Agendar Cita",
    });
    window.open(scheduleLink || contactWhatsappLink, "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur border-t md:hidden">
      <Button size="lg" className="w-full" onClick={handleSchedule}>
        <Calendar className="w-5 h-5 mr-2" />
        {label}
      </Button>
    </div>
  );
}
