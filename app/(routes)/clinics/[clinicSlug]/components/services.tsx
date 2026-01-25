"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { ClinicType } from "@/types/clinic";
import ServiceCard from "./serviceCard";

type ServicesProps = {
  services: ClinicType["services"];
};

export default function Services({ services }: ServicesProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <section id="servicios" className="section bg-accent/50 py-8 md:py-12">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2
          className={`text-center text-3xl font-bold mb-4 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Nuestros Servicios
        </h2>

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
                <ServiceCard service={service} index={index} inView={inView} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Flechas de navegación */}
          <CarouselPrevious className="left-2 sm:-left-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
          <CarouselNext className="right-2 sm:-right-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
        </Carousel>
      </div>
    </section>
  );
}