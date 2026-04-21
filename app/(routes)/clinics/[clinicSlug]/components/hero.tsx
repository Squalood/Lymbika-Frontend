"use client";

import { Button } from "@/components/ui/button";
import {
  Ambulance,
  Baby,
  Bandage,
  Bone,
  Brain,
  BriefcaseMedical,
  Calendar,
  ClipboardPlus,
  Dna,
  Dumbbell,
  HeartPulse,
  Hospital,
  Laugh,
  LucideIcon,
  PillBottle,
  Ribbon,
  ScanHeart,
  Shell,
  Sparkles,
  Stethoscope,
  Syringe,
  Venus,
  ChevronDown,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { ClinicType } from "@/types/clinic";
import * as gtag from "@/lib/gtag";

type HeroTexts = {
  badge: string;
  scheduleButton: string;
  servicesButton: string;
  statsServices: string;
  statsTestimonials: string;
};

type HeroProps = {
  data: ClinicType;
  serviceCount: number;
  testimonialCount: number;
  texts: HeroTexts;
};

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

const Hero = ({ data, serviceCount, testimonialCount, texts }: HeroProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const DefaultIcon = Stethoscope;
  const Icon = iconMap[data.icon] || DefaultIcon;

  const ScheduleLink = () => {
    gtag.event({
      action: "click_schedule",
      category: "engagement",
      label: "Bot\u00f3n Agendar Cita en hero de clinica",
    });
    window.open(data.scheduleLink || data.contactWhatsappLink, "_blank");
  };

  const stats = [
    ...(serviceCount > 0
      ? [{ value: `${serviceCount}+`, label: texts.statsServices }]
      : []),
    ...(testimonialCount > 0
      ? [{ value: `${testimonialCount}+`, label: texts.statsTestimonials }]
      : []),
  ];

  return (
    <section ref={ref} className="w-full px-3 pb-6 md:px-8">
      {/* Card contenedora con fondo navy */}
      <div className="relative rounded-2xl overflow-hidden max-w-6xl mx-auto px-5 py-8 md:px-8 md:py-12" style={{ backgroundColor: "var(--clinic-dark-bg, #0b1630)" }}>

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          {/* Columna izquierda: texto */}
          <div className="space-y-5 md:space-y-6">
            {/* Badge */}
            <span
              className={`inline-flex items-center gap-2 bg-[#1a2f5e] text-[#7eb3f5] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-[#2a4a8a] transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Icon className="w-4 h-4" />
              {texts.badge}
            </span>

            {/* Titulo */}
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {data.heroTitle}
            </h1>

            {/* Subtitulo */}
            <p
              className={`text-[#bfd2ed] text-sm md:text-base leading-relaxed max-w-md transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {data.heroSubtitle}
            </p>

            {/* Stats */}
            {stats.length > 0 && (
              <div
                className={`flex gap-0 pt-1 transition-all duration-700 delay-300 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`pr-4 md:pr-6 ${
                      i > 0 ? "pl-4 md:pl-6 border-l border-[#2a4a8a]" : ""
                    }`}
                  >
                    <p className="text-xl md:text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-[#bfd2ed] text-xs mt-0.5 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Botones */}
            <div
              className={`flex flex-col sm:flex-row gap-3 pt-2 transition-all duration-700 delay-&lsqb;400ms&rsqb ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={ScheduleLink}
              >
                <Calendar className="h-5 w-5 mr-2" />
                {texts.scheduleButton}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link href="#servicios">
                  <ChevronDown className="h-5 w-5 mr-2" />
                  {texts.servicesButton}
                </Link>
              </Button>
            </div>
          </div>

          {/* Columna derecha: Imagen */}
          <div
            className={`relative w-full h-[220px] md:h-[320px] lg:h-[380px] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 delay-200 ${
              inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <Image
              src={data.heroImage.url}
              alt={data.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1630]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
