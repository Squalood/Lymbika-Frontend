"use client";

import { BookingDialog } from "@/components/booking-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import * as gtag from "@/lib/gtag";

type Props = {
  scheduleLink: string;
  label: string;
};

export default function FloatingCta({ scheduleLink, label }: Props) {
  const hasEmbedUrl = !!scheduleLink && scheduleLink.startsWith("http");

  const embedUrl = hasEmbedUrl
    ? scheduleLink.includes("?")
      ? `${scheduleLink}&embed=1`
      : `${scheduleLink}?embed=1`
    : null;

  const trackScheduleOpen = () => {
    gtag.event({
      action: "click_schedule",
      category: "engagement",
      label: "CTA flotante movil - Agendar Cita",
    });
  };

  if (!embedUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur border-t md:hidden">
      <BookingDialog
        src={embedUrl}
        title={label}
        trigger={
          <Button size="lg" className="w-full" onClick={trackScheduleOpen}>
            <Calendar className="w-5 h-5 mr-2" />
            {label}
          </Button>
        }
      />
    </div>
  );
}
