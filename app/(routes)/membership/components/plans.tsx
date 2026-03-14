  "use client";

  import { Check, IdCard, MoveRight, PersonStanding, PhoneCall, Pill, Star, Stethoscope } from "lucide-react";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
  import PlanToggle from "./PlanToggle";
  import { MembershipType } from "@/types/membership";
  import { cn } from "@/lib/utils";

  interface PlansMemberPageProps {
    plans: MembershipType[];
    title?: string;
    description?: string;
    badge?: {
      boldText: string;
      text: string;
      tag?: string;
    };
  }

  const iconMap = {
    MoveRight: <MoveRight size={16} />,
    PhoneCall: <PhoneCall size={16} />,
    Stethoscope: <Stethoscope size={20} className="stroke-primary" />,
    Building2: <PersonStanding size={20} className="stroke-primary" />,
    Pill: <Pill size={20} className="stroke-primary" />
  } as const;

  const PlansMemberPage = ({ plans, title, description, badge }: PlansMemberPageProps) =>  {
    const [isFamilyPlan, setIsFamilyPlan] = useState(false);

    return (
      <div className="max-w-6xl px-6 lg:px-12 py-8 mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="flex flex-row gap-2 justify-center">
            <IdCard className="stroke-primary w-8 h-8 sm:w-12 sm:h-12" />
            <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold">{title}</h2>
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
          {badge && (
            <div className="flex items-center gap-3 bg-muted/50 border rounded-full px-3 py-2 mx-auto w-fit">
              <div className="flex -space-x-2">
                {["👨", "👩", "🧑"].map((emoji, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-sm border-2 border-background">
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-sm">
                Más de <strong>{badge.boldText}</strong> {badge.text}
              </p>
              {badge.tag && (
                <span className="text-xs font-bold border border-amber-400 text-amber-600 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {badge.tag}
                </span>
              )}
            </div>
          )}
        </div>

        <PlanToggle isFamilyPlan={isFamilyPlan} setIsFamilyPlan={setIsFamilyPlan} />

        <Carousel opts={{ startIndex: Math.max(plans.findIndex(p => p.featured), 0) }}>
          <CarouselContent>
            {plans.map((plan, idx) => {
              const isFeatured = plan.featured === true;
              const secondaryLink = plan.secondaryButton
                ? (isFamilyPlan ? plan.secondaryButton.linkF : plan.secondaryButton.linkP)
                : undefined;

              return (
                <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3 pb-4 lg:pb-12">
                  <div className="relative h-full pt-4">
                    {isFeatured && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                          <Star size={11} fill="currentColor" /> MÁS POPULAR
                        </span>
                      </div>
                    )}
                    <Card className={cn(
                      "w-full h-full rounded-2xl transition-shadow hover:shadow-2xl flex flex-col",
                      isFeatured && "border-2 border-primary"
                    )}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-semibold text-lg">
                          {iconMap[plan.icon as keyof typeof iconMap]}{plan.name}
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-1">
                        <div className="flex flex-col gap-8 flex-1">
                          <div className="flex items-end gap-1">
                            <span className="text-5xl font-bold">
                              ${isFamilyPlan ? plan.priceF ?? 0 : plan.priceP ?? 0}
                            </span>
                            <span className="text-sm text-muted-foreground mb-1.5">/ mes</span>
                          </div>
                          <div className="flex flex-col gap-3">
                            {plan.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex gap-3">
                                <Check className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                                <p className="text-sm">{feature.title}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col items-stretch gap-2 mt-auto">
                            <Button
                              variant={isFeatured ? "default" : "outline"}
                              className="gap-2"
                              onClick={() => window.open(`${isFamilyPlan ? plan.button.linkF : plan.button.linkP}`, "_blank")}
                            >
                              {plan.button.label}
                              {iconMap[plan.button.icon as keyof typeof iconMap]}
                            </Button>
                            {plan.secondaryButton && (
                              <button
                                onClick={() => secondaryLink && window.open(secondaryLink, "_blank")}
                                className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
                              >
                                <PhoneCall size={13} className="text-pink-500" />
                                {plan.secondaryButton.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  };

  export default PlansMemberPage;
