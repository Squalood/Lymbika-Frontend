"use client";

import { Timer, PhoneMissed, ClipboardList, BarChart2, LucideIcon } from "lucide-react";
import { LandingPageJson } from "@/types/landingPageJson";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const iconMap: Record<string, LucideIcon> = { Timer, PhoneMissed, ClipboardList, BarChart2 };

type Props = { data?: LandingPageJson["doctoresSection1"] };

const Section1 = ({ data }: Props) => {
  if (!data) return null;
  const { stat, badge, title, description, cards } = data;

  return (
    <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Stat card */}
      {stat && (
        <div className="flex items-center gap-3 md:gap-6 bg-[#eef2ff] border-l-4 border-l-primary rounded-xl px-4 py-4 md:px-6 md:py-5">
          <span className="text-3xl md:text-6xl font-extrabold text-primary shrink-0">
            {stat.value}
          </span>
          <p className="text-xs md:text-base text-gray-700 leading-relaxed">
            {stat.text} <strong>{stat.highlight}</strong> {stat.rest}
          </p>
        </div>
      )}

      {/* Encabezado */}
      <div className="space-y-3">
        {badge && (
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug whitespace-pre-line">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {/* Cards: carousel en móvil, grid en sm+ */}
      {cards && cards.length > 0 && (
        <>
          {/* Móvil */}
          <div className="sm:hidden">
            <Carousel opts={{ align: "center", loop: true }} plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}>
              <CarouselContent className="-ml-3">
                {cards.map((card, i) => {
                  const Icon = iconMap[card.icon];
                  return (
                    <CarouselItem key={i} className="pl-3 basis-2/3">
                      <div className="bg-white rounded-xl border border-gray-100 border-t-4 border-t-primary shadow-sm p-4 space-y-3 h-full">
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                        <h3 className="font-bold text-gray-900 text-sm">{card.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
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

          {/* Desktop */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-4">
            {cards.map((card, i) => {
              const Icon = iconMap[card.icon];
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-100 border-t-4 border-t-primary shadow-sm p-5 space-y-3">
                  {Icon && <Icon className="w-6 h-6 text-primary" />}
                  <h3 className="font-bold text-gray-900 text-base">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Section1;
