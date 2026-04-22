"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";
import { MedicalServiceType, ServiceRateType } from "@/types/medicalService";
import ServiceCard from "./serviceCard";

type ServiceTexts = {
  badge: string;
  title: string;
  description: string;
  typeConsultation: string;
  typeProcedure: string;
  typeStudy: string;
  durationTooltip: string;
  scheduleButton: string;
};

type ServicesProps = {
  services: ServiceRateType[];
  texts: ServiceTexts;
};

const TYPE_ORDER: MedicalServiceType["type"][] = ["consultation", "procedure", "study"];

export default function Services({ services, texts }: ServicesProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const typeLabels: Record<MedicalServiceType["type"], string> = {
    consultation: texts.typeConsultation,
    procedure: texts.typeProcedure,
    study: texts.typeStudy,
  };

  const groups = TYPE_ORDER
    .map((type) => ({ type, items: services.filter((s) => s.medical_service?.type === type) }))
    .filter(({ items }) => items.length > 0);

  return (
    <section id="servicios" className="section bg-accent/50 py-8 md:py-12">
      <div ref={ref} className="max-w-6xl mx-auto px-4">
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
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>

        <div className="space-y-8">
          {groups.map(({ type, items }) => (
            <div key={type}>
              <h4 className="text-lg font-semibold mb-3">{typeLabels[type]}</h4>

              {/* Mobile */}
              <div className="sm:hidden">
                <Carousel opts={{ align: "start" }} className="w-full relative">
                  <CarouselContent>
                    {items.map((service, index) => (
                      <CarouselItem key={service.id} className="basis-2/3 my-2">
                        <ServiceCard service={service} index={index} inView={inView} texts={texts} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white/80 hover:bg-white shadow-md rounded-full" />
                  <CarouselNext className="right-2 bg-white/80 hover:bg-white shadow-md rounded-full" />
                </Carousel>
              </div>

              {/* Desktop */}
              <div className="hidden sm:block">
                <Carousel opts={{ align: "start" }} className="w-full relative">
                  <CarouselContent className={items.length < 4 ? "justify-center" : ""}>
                    {items.map((service, index) => (
                      <CarouselItem key={service.id} className="basis-1/4 my-2">
                        <ServiceCard service={service} index={index} inView={inView} texts={texts} />
                      </CarouselItem>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - items.length) }).map((_, i) => (
                      <CarouselItem key={`empty-${i}`} className="basis-1/4 my-2">
                        <ServiceCard empty />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
                  <CarouselNext className="-right-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
                </Carousel>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
