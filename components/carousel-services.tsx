"use client";

import SpecialtiesSectionCarousel from "@/app/(routes)/specialty/components/specialtiesSectionCarousel";
import MedicalServicesCatalogCarousel from "@/app/(routes)/specialty/components/medicalServicesCatalogCarousel";

const CarouselServices = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      <SpecialtiesSectionCarousel />
      <MedicalServicesCatalogCarousel />
    </div>
  );
};

export default CarouselServices;
