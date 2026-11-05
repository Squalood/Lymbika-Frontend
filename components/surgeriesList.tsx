"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FeaturedSurgeryType } from "@/api/useGetFeaturedSurgeries";
import MedicalServiceCard from "@/components/features/medical-services/medical-service-card";

type SurgeriesListProps = {
  surgeries: FeaturedSurgeryType[];
  title?: string;
  allLink?: string;
};

export default function SurgeriesList({
  surgeries,
  title,
  allLink,
}: SurgeriesListProps) {
  return (
    <div className="w-[900px] p-4">
      <div className="flex items-center justify-between">
        <h2 className="py-2 text-base text-muted-foreground">
          {title ?? "Cirugías destacadas"}
        </h2>
        <Link
          href={allLink ?? "/specialty"}
          className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Ver todas
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Con pocas cirugías el carrusel no tiene a dónde desplazarse: las
          alineamos a la izquierda en vez de estirarlas a todo el ancho. */}
      <Carousel opts={{ align: "start", loop: surgeries.length > 3 }}>
        <CarouselContent className="-ml-3">
          {surgeries.map((item) => (
            <CarouselItem key={item.service.id} className="pl-3 basis-1/3">
              <MedicalServiceCard
                service={item.service}
                href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                minPrice={item.minPrice}
                packageItems={item.packageItems}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {surgeries.length > 3 && (
          <>
            <CarouselPrevious className="-left-3" />
            <CarouselNext className="-right-3" />
          </>
        )}
      </Carousel>
    </div>
  );
}
