"use client";

import SpecialtiesSection from "./specialtiesSection";
import MedicalServicesCatalogSection from "./medicalServicesCatalogSection";

const Specialties = () => {
  return (
    <div className="space-y-10">
      <SpecialtiesSection />
      <MedicalServicesCatalogSection />
    </div>
  );
};

export default Specialties;
