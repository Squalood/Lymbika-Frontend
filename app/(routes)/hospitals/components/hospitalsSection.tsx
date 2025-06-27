"use client";

import { useGetHospitals } from "@/api/getHospitals";
import HospitaCarousel from "./hospitalCarousel";


const HospitaSection = () => {
  
  const { loading, hospitals, error } = useGetHospitals();
  
    if (loading) return <div className="text-center py-20">Cargando hospitales...</div>;
  
    if (error) return <div className="text-center text-red-500 py-20">Error al cargar hospitales: {error}</div>;
  
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="px-6 text-3xl">Hospitales en Ciudad Juárez</h1>
        <HospitaCarousel hospitals={hospitals} />
      </div>
      
    );
};

export default HospitaSection;