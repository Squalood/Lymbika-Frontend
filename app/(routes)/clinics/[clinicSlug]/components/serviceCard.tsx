"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ServiceRateType } from "@/types/medicalService";
import PriceToggle from "@/components/priceToggle";

type ServiceCardProps = {
  service: ServiceRateType;
  index?: number;
  inView?: boolean;
};

const ServiceCard = ({ service, index = 0, inView = true }: ServiceCardProps) => {

  const ms = service.medical_service;

  return (
    <Card
      className={`w-auto md:w-full h-full group relative space-y-4 overflow-hidden p-4 sm:p-4 hover:shadow-md transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <figure className="group-hover:opacity-90">
        {ms.image?.url ? (
          <Image
            className="w-48 rounded-lg aspect-square mx-auto"
            src={ms.image.url}
            width={300}
            height={500}
            alt={ms.name}
          />
        ) : (
          <div className="w-48 aspect-square mx-auto rounded-lg bg-accent flex items-center justify-center">
            <Stethoscope className="size-16 text-muted-foreground/40" />
          </div>
        )}
      </figure>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{ms.name}</h3>
        <p className="text-lg font-semibold text-primary">
          <PriceToggle price={service.price} />
        </p>
        {service.duration_min && (
          <p className="text-sm text-muted-foreground">{service.duration_min} min</p>
        )}
        <p className="text-sm text-muted-foreground">{ms.description}</p>
        {service.notes && (
          <p className="text-xs text-muted-foreground italic">{service.notes}</p>
        )}
      </div>

      <div className="flex gap-1 sm:gap-4">
        <Button variant="outline" className="w-full z-10 px-3 sm:px-4" asChild>
          <a href="#contacto">
            Agendar
          </a>
        </Button>
      </div>
    </Card>
  );
};

export default ServiceCard;