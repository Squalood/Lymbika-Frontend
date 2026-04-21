"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, MessageCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ClinicType } from "@/types/clinic";
import * as gtag from "@/lib/gtag";
type ContactTexts = {
  badge: string;
  title: string;
  infoTitle: string;
  addressLabel: string;
  scheduleLabel: string;
  scheduleButton: string;
  whatsappButton: string;
  fallbackCity: string;
};

type ContactProps = {
  data: ClinicType;
  texts: ContactTexts;
};

const Contact = ({ data, texts }: ContactProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const ScheduleLink = () => {
    gtag.event({
      action: "click_schedule",
      category: "engagement",
      label: "Bot\u00f3n Agendar Cita en contacto de clinica",
    });
    window.open(data.scheduleLink || data.contactWhatsappLink, "_blank");
  };

  const WhatsAppLink = () => {
    gtag.event({
      action: "click_whatsapp",
      category: "engagement",
      label: "Bot\u00f3n WhatsApp en contacto de clinica",
    });
    window.open(data.contactWhatsappLink || "#", "_blank");
  };

  return (
    <section id="contacto" className="section bg-accent/50 pb-24 md:pb-12">
      <div ref={ref} className="max-w-4xl mx-4 md:mx-8 lg:mx-auto px-4">
        {/* Section header */}
        <div
          className={`text-center mb-8 space-y-3 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="secondary"
            className="text-xs font-bold tracking-widest uppercase"
          >
            {texts.badge}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold">
            {texts.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Contact info - Dark navy card */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="rounded-2xl px-6 py-8 text-white space-y-6" style={{ backgroundColor: "var(--clinic-dark-bg, #0b1630)" }}>
              <h3 className="text-xl font-semibold">
                {texts.infoTitle}
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7eb3f5] mt-1 shrink-0" />
                <div>
                  <p className="font-medium">{texts.addressLabel}</p>
                  <p className="text-[#b6d5ff] whitespace-pre-line text-sm">
                    {data.contactLocation}
                  </p>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7eb3f5] mt-1 shrink-0" />
                <div>
                  <p className="font-medium">{texts.scheduleLabel}</p>
                  <p className="text-[#b6d5ff] text-sm">
                    {data.contactSchedule}
                  </p>
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 w-full"
                  onClick={ScheduleLink}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {texts.scheduleButton}
                </Button>
                {data.contactWhatsappLink && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent w-full"
                    onClick={WhatsAppLink}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {texts.whatsappButton}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="p-6 h-full">
              {data.doctor.mapsEmbedUrl ? (
                <div className="relative overflow-hidden rounded-xl h-64 md:h-80 lg:h-[400px]">
                  <iframe
                    title="Ubicaci&oacute;n en Google Maps"
                    src={data.doctor.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    className="border-0 w-full h-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              ) : (
                <div className="bg-accent/30 rounded-xl h-64 md:h-80 lg:h-[400px] flex items-center justify-center">
                  <div className="text-center max-w-xs">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {data.contactLocation}
                    </h3>
                    <p className="text-muted-foreground">{texts.fallbackCity}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
