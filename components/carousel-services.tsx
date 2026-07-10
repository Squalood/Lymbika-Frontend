"use client";

import { useMemo, useState } from "react";
import { useGetServices } from "@/api/getService";
import { useGetMedicalServiceCatalog } from "@/api/useGetMedicalServiceCatalog";
import SpecialtiesSectionCarousel from "@/app/(routes)/specialty/components/specialtiesSectionCarousel";
import MedicalServicesCatalogCarousel from "@/app/(routes)/specialty/components/medicalServicesCatalogCarousel";

const CarouselServices = () => {
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
      <SpecialtiesSectionCarousel
        services={services}
        loading={servicesLoading}
        availableSlugs={availableSlugs}
        activeSlug={activeSpecialtySlug}
        onSelect={setActiveSpecialtySlug}
      />
      <MedicalServicesCatalogCarousel
        items={items}
        loading={itemsLoading}
        activeSpecialtySlug={activeSpecialtySlug}
      />
    </div>
  );
};

export default CarouselServices;
