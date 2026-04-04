"use client";

import { useGetMedicalServiceCatalog } from "@/api/useGetMedicalServiceCatalog";
import { MedicalServiceType } from "@/types/medicalService";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import MedicalServiceCard from "./medicalServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consultas",
  procedure: "Procedimientos",
  study: "Estudios",
};

const TYPE_ORDER: MedicalServiceType["type"][] = ["consultation", "procedure", "study"];

const MedicalServicesCatalogCarousel = () => {
  const { items, loading } = useGetMedicalServiceCatalog();

  const filtered = items.filter((item) => item.service.specialty?.slug);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Servicios médicos</h2>
      {loading ? (
        <SkeletonGalleryCol3 grid={8} />
      ) : (
        TYPE_ORDER.filter((type) => filtered.some((item) => item.service.type === type)).map((type) => (
          <section key={type}>
            <h4 className="px-6 pb-4 text-xl font-medium">{TYPE_LABELS[type]}</h4>
            <div className="px-4 relative">
              <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-2 sm:-ml-4">
                  {filtered
                    .filter((item) => item.service.type === type)
                    .map((item) => (
                      <CarouselItem key={item.service.id} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                        <MedicalServiceCard
                          service={item.service}
                          href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                          minPrice={item.minPrice}
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default MedicalServicesCatalogCarousel;
