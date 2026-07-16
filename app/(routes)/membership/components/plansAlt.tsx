"use client";

import { useState } from "react";
import { Check, Star, Stethoscope, PersonStanding, Pill } from "lucide-react";
import { MembershipType } from "@/types/membership";
import { cn } from "@/lib/utils";
import PlanToggle from "./PlanToggle";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface PlansMemberPageAltProps {
  plans: MembershipType[];
  title?: string;
  description?: string;
}

const iconMap = {
  Stethoscope: Stethoscope,
  Building2: PersonStanding,
  Pill: Pill,
} as const;

const PlansMemberPageAlt = ({ plans, title, description }: PlansMemberPageAltProps) => {
  const [isFamilyPlan, setIsFamilyPlan] = useState(false);

  return (
    <div className="w-full mt-14">
      <p className="text-xs font-bold uppercase tracking-[1.5px] text-blue-300 text-center mb-1.5">
        {title ?? "Elige tu plan"}
      </p>
      {description && (
        <p className="text-sm text-white/60 text-center max-w-md mx-auto mb-8">
          {description}
        </p>
      )}

      <PlanToggle isFamilyPlan={isFamilyPlan} setIsFamilyPlan={setIsFamilyPlan} />

      <Carousel
        opts={{ startIndex: Math.max(plans.findIndex((p) => p.featured), 0) }}
        className={cn(!description && "mt-4")}
      >
        <CarouselContent>
          {plans.map((plan, idx) => {
            const isFeatured = plan.featured === true;
            const Icon = iconMap[plan.icon as keyof typeof iconMap];
            const price = isFamilyPlan ? plan.priceF : plan.priceP;
            const link = isFamilyPlan ? plan.button?.linkF : plan.button?.linkP;

            return (
              <CarouselItem
                key={plan.id ?? idx}
                className="basis-full sm:basis-1/2 lg:basis-1/3 pb-2"
              >
                <div
                  className={cn(
                    "relative flex flex-col h-full rounded-[18px] overflow-hidden border transition-all",
                    isFeatured
                      ? "bg-white border-primary shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
                      : "bg-white/[0.06] border-white/[0.12]"
                  )}
                >
                  {isFeatured && (
                    <span className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      <Star size={10} fill="currentColor" /> Más popular
                    </span>
                  )}

                  <div className="px-6 pt-6 pb-5">
                    <div
                      className={cn(
                        "flex items-center gap-2 text-[17px] font-extrabold mb-1",
                        isFeatured ? "text-foreground" : "text-white"
                      )}
                    >
                      {Icon && (
                        <Icon
                          size={20}
                          className={isFeatured ? "stroke-primary" : "stroke-white"}
                        />
                      )}
                      {plan.name}
                    </div>
                    <p
                      className={cn(
                        "text-[12.5px] leading-snug mb-5",
                        isFeatured ? "text-muted-foreground" : "text-white/55"
                      )}
                    >
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={cn(
                          "text-4xl font-black tracking-tight",
                          isFeatured ? "text-primary" : "text-white"
                        )}
                      >
                        ${price}
                      </span>
                      <span
                        className={cn(
                          "text-[13px]",
                          isFeatured ? "text-muted-foreground" : "text-white/50"
                        )}
                      >
                        / mes
                      </span>
                    </div>
                  </div>

                  <div className={cn("h-px mx-6", isFeatured ? "bg-border" : "bg-white/10")} />

                  <div className="px-6 pt-[18px] flex-1 flex flex-col gap-2.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check
                          className={cn(
                            "w-3.5 h-3.5 mt-0.5 shrink-0",
                            isFeatured ? "text-primary" : "text-blue-300"
                          )}
                        />
                        <p
                          className={cn(
                            "text-[13px] leading-snug",
                            isFeatured ? "text-foreground/80" : "text-white/75"
                          )}
                        >
                          {f.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 pt-5 pb-6 mt-auto">
                    <button
                      onClick={() => {
                        if (link) window.open(link, "_blank", "noopener,noreferrer");
                      }}
                      className={cn(
                        "block w-full text-center rounded-[10px] py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5",
                        isFeatured
                          ? "bg-primary text-white hover:opacity-90"
                          : "bg-white/[0.08] text-white border border-white/25 hover:bg-white/[0.14]"
                      )}
                    >
                      {plan.button?.label ?? "Registrarme →"}
                    </button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PlansMemberPageAlt;
