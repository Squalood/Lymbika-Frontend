"use client";

import { Building2, Check, IdCard, MoveRight, PhoneCall, Pill, Stethoscope } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import es from "@/locals/es.json";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const iconMap = {
  MoveRight: <MoveRight size={16} />,
  PhoneCall: <PhoneCall size={16} />,
  Stethoscope: <Stethoscope size={20} className="stroke-primary"/>,
  Building2: <Building2 size={20} className="stroke-primary"/>,
  Pill: <Pill size={20} className="stroke-primary" />
};

const PlansMemberPage = () => {
  const { title, description, plans } = es.PlansMemberPage;
  const [isFamilyPlan, setIsFamilyPlan] = useState(false);

  return (
    <div className="max-w-6xl px-6 lg:px-12 py-20 mx-auto">
      <div className="text-center max-w-xl mx-auto space-y-4">
        <div className="flex flex-row gap-2 justify-center">
          <IdCard className="stroke-primary w-8 h-8 sm:w-12 sm:h-12" />
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold">{title}</h2>
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-center py-12 gap-2">
        <span>{isFamilyPlan ? "Planes por Familia" : "Planes por Persona"}</span>
        <Switch checked={isFamilyPlan} onCheckedChange={setIsFamilyPlan}/>
      </div>
      <Carousel
        opts={{
          startIndex: 1,
        }}
      >
        <CarouselContent>
          {plans.map((plan, idx) => (
            <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3" >
              <Card className={`w-full rounded-md ${idx === 1 ? "shadow-2xl" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4 font-normal">
                    {iconMap[plan.icon as keyof typeof iconMap]}{plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="text-xl flex items-center gap-2 justify-center sm:justify-start">
                        <span className="text-4xl">
                          ${isFamilyPlan ? plan.priceM : plan.priceP}
                        </span>
                        <span className="text-sm text-muted-foreground">/ mes</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex gap-4">
                          <Check className="w-4 h-4 mt-1 text-primary" />
                          <p>{feature.title}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant={
                        plan.button.variant === "outline" ? "outline" : "default"
                      }
                      className="gap-4"
                    >
                      {plan.button.label}
                      {iconMap[plan.button.icon as keyof typeof iconMap]}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
    </Carousel>
    </div>
  );
};

export default PlansMemberPage;
