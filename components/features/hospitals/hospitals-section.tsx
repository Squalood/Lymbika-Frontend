"use client";

import { useGetHospitals } from "@/hooks/use-hospitals";
import HospitaCarousel from "@/components/features/hospitals/hospital-carousel";
import HospitalCardSkeleton from "@/components/features/hospitals/hospital-card-skeleton";


const HospitaSection = ({ title }: { title?: string }) => {
  
  const { loading, hospitals, error } = useGetHospitals();
  
    if (loading) return <HospitalCardSkeleton/>;

    if (error) return <div className="text-center text-red-500 py-20">Error al cargar hospitales: {error}</div>;
  
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="px-6 text-3xl">{title ?? "Hospitales en Ciudad Juárez"}</h1>
        <HospitaCarousel hospitals={hospitals} />
      </div>
      
    );
};

export default HospitaSection;