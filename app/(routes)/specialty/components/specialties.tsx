"use client";

import SpecialtiesSection from "./specialties-section";
import MedicalServicesCatalogSection from "./medical-services-catalog-section";

const Specialties = () => {
  return (
    <div className="space-y-10">
      <SpecialtiesSection />
      <MedicalServicesCatalogSection />
    </div>
  );
};

export default Specialties;
