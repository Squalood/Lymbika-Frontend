"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import { Activity, Ambulance, Baby, Bandage, Brain, BriefcaseMedical, ClipboardPlus, Dumbbell, Heart, HeartPulse, Hospital, LucideIcon, Pill, Ribbon, ScanHeart, Shell, Sparkles, Stethoscope, Syringe, Venus } from "lucide-react";
import PriceToggle from "@/components/priceToggle";

const iconMap: Record<string, LucideIcon> = {
  icon1: Stethoscope,
  icon2: Activity,
  Heart: Heart,
  HeartPulse,
  Brain,
  ScanHeart,
  Hospital,
  Ribbon,
  Venus,
  Baby,
  Sparkles,
  Shell,
  ClipboardPlus,
  Syringe,
  Dumbbell,
  BriefcaseMedical,
  Ambulance,
  Bandage,
  Pill
};

type ServicesProps = {
  services: ClinicType["services"];
};

export default function Services({ services }: ServicesProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <section id="servicios" className="section bg-accent/50 py-16">
      <div ref={ref} className="max-w-5xl mx-auto px-4">
        <h2
          className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${
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
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Stethoscope;

              return (
                <CarouselItem
                  key={service.id}
                  className="basis-2/3 sm:basis-1/2 lg:basis-1/3 mx-auto my-2"
                >
                  <Card
                    className={`transition-all duration-700 h-full ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">
                        <PriceToggle price={service.price} />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* Flechas de navegación */}
          <CarouselPrevious className="left-2 sm:-left-8 bg-white/80 hover:bg-white shadow-md rounded-full md:hidden" />
          <CarouselNext className="right-2 sm:-right-8 bg-white/80 hover:bg-white shadow-md rounded-full md:hidden" />
        </Carousel>
      </div>
    </section>
  );
}