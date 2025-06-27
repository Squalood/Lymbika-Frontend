"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { DollarSign, Star } from "lucide-react";
import { HospitalType } from "@/types/hospital";

interface HospitaSectionProps {
  hospitals: HospitalType[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.round(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))}
  </div>
);

const PriceRating = ({ level }: { level: "economico" | "estandar" | "premium" }) => {
  const priceLevels = {
    economico: 1,
    estandar: 2,
    premium: 3,
  };

  return (
    <div className="flex">
      {Array.from({ length: priceLevels[level] }, (_, i) => (
        <DollarSign key={i} size={20} color="#1dc967" />
      ))}
    </div>
  );
};

const HospitaCarousel = ({ hospitals }: HospitaSectionProps) => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {hospitals.map((hospital) => (
            <CarouselItem key={hospital.id} className="basis-[85%] sm:basis-[50%] md:basis-[33%]">
              <Card className="flex flex-col hover:shadow-lg transition-shadow w-full h-[450px]">
                <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={hospital.imagen.url}
                    alt={`Imagen de ${hospital.hospitalName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{hospital.hospitalName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-grow">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Infraestructura</p>
                      <StarRating rating={hospital.infraestructura} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Servicio</p>
                      <StarRating rating={hospital.servicio} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Review</p>
                      <StarRating rating={hospital.review} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Precio</p>
                      <PriceRating level={hospital.precio} />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{hospital.descripcion}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center gap-4 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default HospitaCarousel;