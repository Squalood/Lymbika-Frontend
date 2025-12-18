"use client";

import { Button } from "@/components/ui/button";
import { Ambulance, Baby, Bandage, Bone, Brain, BriefcaseMedical, Calendar, ClipboardPlus, Dna, Dumbbell, HeartPulse, Hospital, Laugh, LucideIcon, PillBottle, Ribbon, ScanHeart, Shell, Sparkles, Stethoscope, Syringe, Venus } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { ClinicType } from "@/types/clinic";
import { useWindowSize } from "@/hooks/useWindowSize";
import * as gtag from "@/lib/gtag";

type HeroProps = {
  data: ClinicType;
};
// Mapa de nombre de iconos a componentes
const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Stethoscope,
  ScanHeart,
  Brain,
  Hospital,
  Ribbon,
  Venus,
  Baby,
  Sparkles,
  Shell,
  ClipboardPlus,
  Syringe,
  Dumbbell,
  Laugh,
  BriefcaseMedical,
  PillBottle,
  Bone,
  Bandage,
  Dna,
  Ambulance,
};

const Hero = ({ data }: HeroProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const DefaultIcon = Stethoscope;
  const Icon = iconMap[data.icon] || DefaultIcon;
  const { width } = useWindowSize();
  const size = width >= 1024 ? 56 : width >= 768 ? 52 : 40;

  const ScheduleLink = () => {
      gtag.event({
        action: "click_schedule",
        category: "engagement",
        label: "Botón Agendar Cita en contacto de clinica",
      });
      window.open(data.scheduleLink || "#", "_blank");
    };

  return (
    <section className="relative h-96 md:h-[500px] lg:h-[600px] flex items-center pt-20 overflow-hidden ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.heroImage.url}
          alt={data.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/65" />
      </div>

      <div ref={ref} className="relative z-10 py-20 px-4 md:px-14 lg:px-28">
        <div className="max-w-3xl">
          
          <div className="flex flex-row gap-2 lg:gap-4">
            <Icon size={size} className="text-primary"/>
            <h1 className={`text-4xl md:text-6xl font-semibold mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {data.heroTitle} 
            </h1>
          </div>
          <p className={`text-lg md:text-2xl text-muted-foreground mb-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {data.heroSubtitle}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button variant="outline" size="lg" >
              <Link href="#" onClick={ScheduleLink}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;