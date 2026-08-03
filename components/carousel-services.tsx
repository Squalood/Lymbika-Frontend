"use client";

import { useMemo, useState } from "react";
import { useGetServices } from "@/api/getService";
import { useGetMedicalServiceCatalog } from "@/api/useGetMedicalServiceCatalog";
import SpecialtiesSectionCarousel from "@/app/(routes)/specialty/components/specialtiesSectionCarousel";
import MedicalServicesCatalogCarousel from "@/app/(routes)/specialty/components/medicalServicesCatalogCarousel";

const CarouselServices = ({ title, subTitle }: { title?: string; subTitle?: string }) => {
  const { result: servicesResult, loading: servicesLoading } = useGetServices();
  const { items, loading: itemsLoading } = useGetMedicalServiceCatalog();
  const [activeSpecialtySlug, setActiveSpecialtySlug] = useState<string | null>(null);

  const services = servicesResult || [];

  const availableSlugs = useMemo(
    () =>
      new Set(
        items
          .map((item) => item.service.specialty?.slug)
          .filter((slug): slug is string => Boolean(slug))
      ),
    [items]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {title && <h2 className="text-3xl">{title}</h2>}
      <SpecialtiesSectionCarousel
        services={services}
        loading={servicesLoading}
        availableSlugs={availableSlugs}
        activeSlug={activeSpecialtySlug}
        onSelect={setActiveSpecialtySlug}
      />
      {subTitle && <h3 className="text-2xl">{subTitle}</h3>}
      <MedicalServicesCatalogCarousel
        items={items}
        loading={itemsLoading}
        activeSpecialtySlug={activeSpecialtySlug}
      />
    </div>
  );
};

export default CarouselServices;
