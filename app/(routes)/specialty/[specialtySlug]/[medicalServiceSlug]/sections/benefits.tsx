import {
  Stethoscope, Activity, Heart, Brain, Hospital, Ribbon, Venus, Baby,
  Sparkles, Shell, ClipboardPlus, Syringe, Dumbbell, BriefcaseMedical,
  Ambulance, Bandage, Pill, Percent, CalendarPlus, UserRoundPlus,
  Waypoints, Presentation, ChartNoAxesCombined, Handshake, Globe,
  ScanHeart, HeartPulse, HeartHandshake, Home, Leaf, ShieldCheck,
  UserCheck, PillBottle, ClipboardCheck, LucideIcon,
} from "lucide-react";
import { MedicalServiceType } from "@/types/medical-service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ICON_MAP: Record<string, LucideIcon> = {
  icon1: Stethoscope, icon2: Heart, icon3: Activity,
  icon4: ClipboardPlus, icon5: Syringe, icon6: BriefcaseMedical,
  Stethoscope, Activity, Heart, "HeartPulse,": HeartPulse, HeartPulse,
  Brain, ScanHeart, Hospital, Ribbon, Venus, Baby, Sparkles, Shell,
  ClipboardPlus, Syringe, Dumbbell, BriefcaseMedical, Ambulance,
  Bandage, Pill, Percent, CalendarPlus, UserRoundPlus, Waypoints,
  Presentation, ChartNoAxesCombined, Handshake, Globe,
  HeartHandshake, Home, Leaf, ShieldCheck, UserCheck, PillBottle, ClipboardCheck,
};

export default function Benefits({ service }: { service: MedicalServiceType }) {
  const benefits = service.landingBenefit ?? [];
  const t = service.landingTexts;
  if (benefits.length === 0) return null;

  return (
    <section id="beneficios" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-primary">
          {t?.benefits_label ?? "El procedimiento"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {t?.benefits_title ?? "Por qué elegir este procedimiento"}
        </h2>
      </div>

      {/* Móvil: carousel */}
      <div className="sm:hidden">
        <Carousel opts={{ align: "center", loop: true }}>
          <CarouselContent className="-ml-3">
            {benefits.map((b, i) => {
              const Icon = b.icon ? ICON_MAP[b.icon] : null;
              return (
                <CarouselItem key={i} className="pl-3 basis-3/4">
                  <div className="rounded-xl border bg-card p-4 space-y-3 h-full">
                    {Icon && (
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((b, i) => {
          const Icon = b.icon ? ICON_MAP[b.icon] : null;
          return (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
              {Icon && (
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              )}
              <h3 className="font-bold text-foreground text-base">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
