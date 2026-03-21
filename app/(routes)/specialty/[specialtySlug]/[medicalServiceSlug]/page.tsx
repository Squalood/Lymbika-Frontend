"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MedicalServiceDoctors from "./components/medicalServiceDoctors";

export default function Page() {
  const params = useParams();
  const specialtySlug = typeof params.specialtySlug === "string" ? params.specialtySlug : "";

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 px-4 sm:px-6">
      <Link
        href={`/specialty/${specialtySlug}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Volver a la especialidad
      </Link>
      <MedicalServiceDoctors />
    </div>
  );
}
