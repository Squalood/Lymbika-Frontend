"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HospitalType } from "@/types/hospital";

interface HospitalCardSimpleProps {
  hospital: HospitalType;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.round(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))}
    <span className="text-sm ml-1 text-muted-foreground">({rating.toFixed(1)})</span>
  </div>
);

const PriceRating = ({ level }: { level: "economico" | "estandar" | "premium" }) => {
  const priceLevels = {
    economico: 2,
    estandar: 3,
    premium: 4,
  };

  return (
    <div className="flex">
      {Array.from({ length: priceLevels[level] || 0 }, (_, i) => (
        <DollarSign key={i} size={20} color="#1dc967" />
      ))}
    </div>
  );
};

const HospitalCardSimple = ({ hospital }: HospitalCardSimpleProps) => {
  const [expanded, setExpanded] = useState(false);

  const hospitalName = hospital.hospitalName || "Hospital sin nombre";
  const imagenUrl = hospital.imagen?.url || "/images/fallback-hospital.jpg"; // Imagen por defecto
  const descripcion = hospital.descripcion || "Sin descripción disponible";
  const infraestructura = hospital.infraestructura || 0;
  const servicio = hospital.servicio || 0;
  const review = hospital.review || 0;
  const precio = hospital.precio || "economico";

  const promedio = (infraestructura + servicio + review) / 3;

  return (
    <Card className="flex flex-col items-center gap-3 p-6 hover:shadow-lg transition-shadow w-full">
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        <Image
          src={imagenUrl}
          alt={`Imagen de ${hospitalName}`}
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
      <h3 className="text-base font-medium text-gray-800 text-center">{hospitalName}</h3>
      <StarRating rating={promedio} />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="text-muted-foreground"
      >
        {expanded ? "Ver menos" : "Ver más"}
        <ChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </Button>

      {/* grid-rows 0fr -> 1fr permite animar la altura sin conocerla de antemano */}
      <div
        aria-hidden={!expanded}
        className={`grid w-full transition-all duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
            <div>
              <p className="font-medium text-sm text-muted-foreground">Infraestructura</p>
              <StarRating rating={infraestructura} />
            </div>
            <div>
              <p className="font-medium text-sm text-muted-foreground">Servicio</p>
              <StarRating rating={servicio} />
            </div>
            <div>
              <p className="font-medium text-sm text-muted-foreground">Review</p>
              <StarRating rating={review} />
            </div>
            <div>
              <p className="font-medium text-sm text-muted-foreground">Precio</p>
              <PriceRating level={precio} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">{descripcion}</p>
        </div>
      </div>
    </Card>
  );
};

export default HospitalCardSimple;
