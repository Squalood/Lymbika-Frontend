"use client";
import { useSearchParams } from "next/navigation";
import { useGetDoctors } from "@/hooks/use-doctors";
import { Search } from "@/components/searchBar";
import { sinAcentos } from "@/lib/utils";
import DoctorReel from "@/components/features/doctors/doctor-reel";

interface ReviewPageClientProps {
  userId?: number;
}

export default function ReviewPageClient({ userId }: ReviewPageClientProps) {
  const { doctors, loading } = useGetDoctors();
  const searchParams = useSearchParams();

  const query = sinAcentos(searchParams.get("query"));

  const filteredDoctors = doctors.filter(
    (d) =>
      sinAcentos(d.doctorName).includes(query) ||
      sinAcentos(d.location).includes(query)
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
