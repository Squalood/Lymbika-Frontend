"use client";

import { Megaphone, Settings, LayoutDashboard, ArrowRight, TriangleAlert, LucideIcon } from "lucide-react";
import { LandingPageJson } from "@/types/landingPageJson";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const iconMap: Record<string, LucideIcon> = { Megaphone, Settings, LayoutDashboard };

type Props = { data?: LandingPageJson["doctoresSection3"] };

const Section3 = ({ data }: Props) => {
  if (!data) return null;
  const { badge, title, description, departments, notice } = data;

  return (
    <section className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3">
        {badge && <span className="text-xs font-bold tracking-widest uppercase text-primary">{badge}</span>}
        {title && <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">{title}</h2>}
        {description && <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">{description}</p>}
      </div>
      {/* Cards: carousel en móvil, grid en sm+ */}
      {departments && departments.length > 0 && (
        <>
          {/* Móvil */}
          <div className="sm:hidden">
            <Carousel opts={{ align: "center", loop: true }} plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}>
              <CarouselContent className="-ml-3">
                {departments.map((dept, i) => {
                  const Icon = iconMap[dept.icon];
                  return (
                    <CarouselItem key={i} className="pl-3 basis-3/4">
                      <div className="rounded-xl border bg-card p-4 space-y-3 h-full">
                        {Icon && (
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <h3 className="font-bold text-foreground text-sm">{dept.name}</h3>
                        <ul className="space-y-2">
                          {dept.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <ArrowRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
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
          <div className="hidden sm:grid sm:grid-cols-3 gap-4">
            {departments.map((dept, i) => {
              const Icon = iconMap[dept.icon];
              return (
                <div key={i} className="rounded-xl border bg-card p-6 space-y-4">
                  {Icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <h3 className="font-bold text-foreground text-base">{dept.name}</h3>
                  <ul className="space-y-2">
                    {dept.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      )}

      {notice && (
        <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
          <TriangleAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Tu parte en el sistema:</strong>{" "}
            {notice.replace("Tu parte en el sistema: ", "")}
          </p>
        </div>
      )}
    </section>
  );
};

export default Section3;
