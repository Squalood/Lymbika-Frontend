"use client";

import { MedicalServiceCatalogItem } from "@/api/useGetMedicalServiceCatalog";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";
import MedicalServiceCard from "./medicalServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  items: MedicalServiceCatalogItem[];
  loading: boolean;
  activeSpecialtySlug: string | null;
};

const MedicalServicesCatalogCarousel = ({ items, loading, activeSpecialtySlug }: Props) => {
  const filtered = items
    .filter(
      (item) =>
        item.service.specialty?.slug &&
        (!activeSpecialtySlug || item.service.specialty.slug === activeSpecialtySlug)
    )
    .sort((a, b) => Number(!!b.service.has_landing_page) - Number(!!a.service.has_landing_page));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">Servicios médicos</h2>
      {loading ? (
        <SkeletonGalleryCol3 grid={8} />
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500 px-4">No hay servicios disponibles para esta especialidad.</p>
      ) : (
        <div className="px-0 relative">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent className="-ml-2 sm:-ml-4">
              {filtered.map((item) => (
                <CarouselItem key={item.service.id} className="pl-2 sm:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                  <MedicalServiceCard
                    service={item.service}
                    href={`/specialty/${item.service.specialty!.slug}/${item.service.slug}`}
                    minPrice={item.minPrice}
                    packageItems={item.packageItems}
                  />
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

export default MedicalServicesCatalogCarousel;
