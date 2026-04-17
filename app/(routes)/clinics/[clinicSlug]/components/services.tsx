"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { ServiceRateType } from "@/types/medicalService";
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

export default function Services({ services, texts }: ServicesProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <section id="servicios" className="section bg-accent/50 py-8 md:py-12">
      <div ref={ref} className="max-w-6xl mx-auto px-4">
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
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>

        <Carousel
          plugins={[autoplay.current]}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem
                key={service.id}
                className="basis-2/3 md:basis-1/3 lg:basis-1/4 mx-auto my-2"
              >
                <ServiceCard service={service} index={index} inView={inView} texts={texts} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 sm:-left-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
          <CarouselNext className="right-2 sm:-right-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
        </Carousel>
      </div>
    </section>
  );
}
