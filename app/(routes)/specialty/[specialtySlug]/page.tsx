"use client";

import MedicalServicesCatalog from "./components/medicalServicesCatalog";
import SpecialtyInfo from "./components/specialtyInfo";
import SpecialtyTitle from "./components/specialtyTitle";

export default function Page() {

  return (
    <div className="w-full py-4 mx-auto sm:py-16">
      <SpecialtyTitle/>
      <SpecialtyInfo />
      <MedicalServicesCatalog />
    </div>
  );
}
