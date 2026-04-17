"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Stethoscope } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceRateType } from "@/types/medicalService";
import PriceToggle from "@/components/priceToggle";
type ServiceCardTexts = {
  typeConsultation: string;
  typeProcedure: string;
  typeStudy: string;
  durationTooltip: string;
  scheduleButton: string;
};

type ServiceCardProps = {
  service: ServiceRateType;
  index?: number;
  inView?: boolean;
  texts: ServiceCardTexts;
};

const ServiceCard = ({
  service,
  index = 0,
  inView = true,
  texts,
}: ServiceCardProps) => {
  const ms = service.medical_service;

  const typeLabels: Record<string, string> = {
    consultation: texts.typeConsultation,
    procedure: texts.typeProcedure,
    study: texts.typeStudy,
  };

  return (
    <Card
      className={`w-auto md:w-full h-full flex flex-col group relative overflow-hidden border-t-4 border-t-primary hover:shadow-md transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardHeader className="p-4 pb-2">
        {/* Imagen */}
        <div className="group-hover:opacity-90 transition-opacity">
          {ms.image?.url ? (
            <Image
              className="w-full rounded-lg aspect-[4/3] object-cover"
              src={ms.image.url}
              width={300}
              height={225}
              alt={ms.name}
            />
          ) : (
            <div className="w-full aspect-[4/3] rounded-lg bg-accent flex items-center justify-center">
              <Stethoscope className="size-16 text-muted-foreground/40" />
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-3">
          {ms.type && (
            <Badge variant="outline" className="text-xs">
              {typeLabels[ms.type] || ms.type}
            </Badge>
          )}
          {service.duration_min && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration_min} min
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{texts.durationTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2 space-y-1.5 flex-1">
        <h3 className="text-base font-semibold leading-tight">{ms.name}</h3>
        <span className="text-lg font-bold text-primary block">
          <PriceToggle price={service.price} />
        </span>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {ms.description}
        </p>

        {service.notes && (
          <p className="text-xs text-muted-foreground italic">{service.notes}</p>
        )}
      </CardContent>

      <Separator className="mx-4 w-auto" />

      <CardFooter className="p-4 pt-3">
        <Button className="w-full" asChild>
          <a href="#contacto">{texts.scheduleButton}</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
