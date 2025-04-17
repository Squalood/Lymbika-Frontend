"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetDoctorsByCategory } from "@/api/getDoctorsByCategory";

const SurgeryTitle = () => {
  const { surgerySlug } = useParams() as { surgerySlug: string };
  const { result, loading } = useGetDoctorsByCategory(surgerySlug, "surgery");

  const [surgeryTitle, setSurgeryTitle] = useState("Cargando...");

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      for (const doctor of result) {
        const matched = doctor.surgeries?.find((s) => s.slug === surgerySlug);
        if (matched) {
            setSurgeryTitle(matched.surgeryName);
          break;
        }
      }
    }
  }, [loading, result, surgerySlug]);

  return (
    <div className="max-w-xs md:max-w-4xl mx-auto">
      <h1 className="text-3xl font-medium mb-4">{surgeryTitle}</h1>
    </div>
  );
};

export default SurgeryTitle;
