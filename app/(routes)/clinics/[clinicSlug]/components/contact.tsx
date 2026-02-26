"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ClinicType } from "@/types/clinic";
import * as gtag from "@/lib/gtag";

type ContactProps = {
  data: ClinicType;
};

const Contact = ({ data }: ContactProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  /*
  const ContactNumber = () => {
    gtag.event({
      action: "click_whatsapp",
      category: "engagement",
      label: "Botón WhatsApp en contacto de clinica",
    });

    window.open(data.contactWhatsappLink || "#", "_blank");
  };*/
  const ScheduleLink = () => {
    gtag.event({
      action: "click_schedule",
      category: "engagement",
      label: "Botón Agendar Cita en contacto de clinica",
    });
    window.open(data.scheduleLink || data.contactWhatsappLink, "_blank");
  };

  return (
    <section id="contacto" className="section bg-accent/50">
      <div ref={ref} className="max-w-4xl mx-4 md:mx-8 lg:mx-auto px-4">
        <h2 className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Contacto y Ubicación
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Información de contacto */}
          <div className={`space-y-6 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-muted-foreground whitespace-pre-line">{data.contactLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Horario de Atención</p>
                    <p className="text-muted-foreground">{data.contactSchedule}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              <Button size="lg" className="w-full " asChild>
                <Link href="#" onClick={ScheduleLink}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </Link>
              </Button>
            </div>
          </div>

          {/* Mapa o ubicación visual */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Card className="p-6 h-full">
              {data.doctor.mapsEmbedUrl ? (
                <div className="relative overflow-hidden rounded-xl h-64 md:h-80 lg:h-[400px]">
                  <iframe
                    title="Ubicación en Google Maps"
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
                    <h3 className="text-xl font-semibold mb-2">{data.contactLocation}</h3>
                    <p className="text-muted-foreground">Cd Juarez, México</p>
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