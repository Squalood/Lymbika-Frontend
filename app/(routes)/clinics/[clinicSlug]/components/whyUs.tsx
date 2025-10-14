"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare, Clock, PiggyBank, Heart, LucideIcon, Ambulance, Baby, Bandage, Brain, BriefcaseMedical, ClipboardPlus, Dumbbell, HeartPulse, Hospital, Pill, Ribbon, ScanHeart, Shell, Sparkles, Syringe, Venus, Percent } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ClinicType } from "@/types/clinic";

const iconMap: Record<string, LucideIcon> = {
  icon1: Clock,
  icon2: MessageSquare,
  icon3: PiggyBank,
  icon4: Heart,
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
  Pill,
  Percent
};

type WhyUsProps = {
  features: ClinicType["features"];
};

export default function WhyUs({ features }: WhyUsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <section id="por-que-elegirnos" className="section bg-background">
      <div ref={ref} className="max-w-5xl mx-auto px-4">
        <h2
          className={`text-center mb-12 text-3xl font-bold transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          ¿Por qué elegirnos?
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
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || MessageSquare;
              return (
                <CarouselItem
                  key={feature.id}
                  className="basis-3/5 sm:basis-1/2 lg:basis-1/4 mx-auto my-2"
                >
                  <Card
                    className={`p-6 h-full transition-all duration-700 ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* Flechas de navegación */}
          <CarouselPrevious className="left-2 sm:-left-8 bg-white/80 hover:bg-white shadow-md rounded-full md:hidden" />
          <CarouselNext className="right-2 sm:-right-8 bg-white/80 hover:bg-white shadow-md rounded-full  md:hidden" />
        </Carousel>
      </div>
    </section>
  );
}