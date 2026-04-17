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
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Clock,
  PiggyBank,
  Heart,
  LucideIcon,
  Ambulance,
  Baby,
  Bandage,
  Brain,
  BriefcaseMedical,
  ClipboardPlus,
  Dumbbell,
  HeartPulse,
  Hospital,
  Pill,
  Ribbon,
  ScanHeart,
  Shell,
  Sparkles,
  Syringe,
  Venus,
  Percent,
} from "lucide-react";
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
  Percent,
};

type WhyUsTexts = {
  badge: string;
  title: string;
};

type WhyUsProps = {
  features: ClinicType["features"];
  texts: WhyUsTexts;
};

function FeatureCard({
  feature,
  index,
  inView,
}: {
  feature: ClinicType["features"][number];
  index: number;
  inView: boolean;
}) {
  const Icon = iconMap[feature.icon] || MessageSquare;

  return (
    <Card
      className={`p-5 h-full border-t-4 border-t-primary transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-base font-semibold">{feature.title}</h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </Card>
  );
}

export default function WhyUs({ features, texts }: WhyUsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <section id="por-que-elegirnos" className="section bg-background">
      <div ref={ref} className="max-w-5xl mx-auto px-4">
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
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <Carousel
            plugins={[autoplay.current]}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem
                  key={feature.id}
                  className="basis-3/5 sm:basis-1/2 mx-auto my-2"
                >
                  <FeatureCard
                    feature={feature}
                    index={index}
                    inView={inView}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:-left-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
            <CarouselNext className="right-2 sm:-right-8 bg-white/80 hover:bg-white shadow-md rounded-full" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
