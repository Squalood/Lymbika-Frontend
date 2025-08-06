"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
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

  return (
    <section id="servicios" className="section bg-accent/30">
      <div ref={ref} className="container-xl">
        <h2 className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Nuestros Servicios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <Card
                key={service.id}
                className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}