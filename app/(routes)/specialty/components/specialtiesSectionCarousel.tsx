"use client";

import { useGetServices } from "@/api/getService";
import { ResponseType } from "@/types/response";
import { ServiceType } from "@/types/service";
import * as LucideIcons from "lucide-react";
import { Stethoscope } from "lucide-react";
import { ServiceIconType } from "@/types/service";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SpecialtiesSectionCarousel = () => {
  const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();

  const services: ServiceType[] = servicesResult || [];

  // Agrupar en columnas de 2 filas
  const columns: ServiceType[][] = [];
  for (let i = 0; i < services.length; i += 2) {
    columns.push(services.slice(i, i + 2));
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Especialidades</h2>
      <p className="text-sm text-gray-500 mb-6">Encuentra al especialista que necesitas</p>

      {servicesLoading ? (
        <SkeletonGalleryCol3 grid={6} />
      ) : (
        <div className="relative">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 sm:-ml-3">
              {columns.map((col, colIndex) => (
                <CarouselItem key={colIndex} className="pl-2 sm:pl-3 basis-1/3 sm:basis-1/4 md:basis-1/6">
                  <div className="flex flex-col gap-2 h-full ">
                    {col.map((service) => {
                      const Icon = service.icon
                        ? (LucideIcons[service.icon as ServiceIconType] as React.ElementType)
                        : Stethoscope;

                      return (
                        <Link
                          key={service.id}
                          href={`/specialty/${service.slug}`}
                          className="flex flex-col items-center justify-center gap-2 p-4 h-28 overflow-hidden bg-white border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-center no-underline"
                        >
                          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-medium text-gray-800 leading-tight line-clamp-2">
                            {service.serviceName}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default SpecialtiesSectionCarousel;
