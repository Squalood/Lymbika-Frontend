"use client";
import { useSearchParams } from "next/navigation";
import { useGetDoctors } from "@/api/getDoctor";
import { Search } from "@/components/searchBar";
import DoctorReel from "../../doctor-catalog/components/doctorReel";

interface ReviewPageClientProps {
  userId?: number;
}

export default function ReviewPageClient({ userId }: ReviewPageClientProps) {
  const { doctors, loading } = useGetDoctors();
  const searchParams = useSearchParams();

  const query =
    searchParams
      .get("query")
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") || "";

  const normalize = (text?: string) =>
    (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredDoctors = doctors.filter(
    (d) =>
      normalize(d.doctorName).includes(query) ||
      normalize(d.location).includes(query)
  );

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Título principal */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Haz review de un doctor
      </h1>

      {/* Barra de búsqueda */}
      <div className="max-w-2xl mx-auto">
        <Search category="doctores" />
      </div>

      {/* Vista Carrusel de Doctores */}
      <DoctorReel
        doctors={filteredDoctors}
        title="Doctores"
        actionType="review"
        userId={userId}
      />
    </div>
  );
}
