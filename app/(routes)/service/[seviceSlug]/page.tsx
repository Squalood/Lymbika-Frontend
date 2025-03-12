"use client";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"; 
import SkeletonSchema from "@/components/skeletonSchema";
import { useState, useEffect } from "react";
import { useGetServiceDoctor } from "@/api/getServiceDoctor";
import { DoctorType } from "@/types/doctor";
import FiltersControlsService from "./components/filters-controls-service";
import CardDoctor from "./components/doctor-card";

export default function Page() {
    const params = useParams();
    const serviceSlug = typeof params.serviceSlug === "string" ? params.serviceSlug : ""; 

    const { result, loading, error }: ResponseType = useGetServiceDoctor(serviceSlug);
    const [serviceFilter, setServiceFilter] = useState("");

    useEffect(() => {
        console.log("Resultado de la API:", result);
    }, [result]);

    // Validación para asegurarse de que `result` es un array antes de filtrar/mapear
    const filteredDoctors = (Array.isArray(result) && !loading) 
        ? (serviceFilter === "" 
            ? result 
            : result.filter((doctor: DoctorType) => doctor.service?.serviceName === serviceFilter)) 
        : [];

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <Separator />

            {/* Contenedor general con flexbox en pantallas grandes */}
            <div className="flex flex-col sm:flex-row sm:gap-10">
                
                {/* Filtros - Ocupa todo el ancho en móviles y 1/3 en desktop */}
                <div className="w-full sm:w-1/3">
                    <FiltersControlsService setFilterService={setServiceFilter} />
                </div>

                {/* Contenedor de doctores - Ocupa todo el ancho en móviles y 2/3 en desktop */}
                <div className="w-full sm:w-2/3">
                    {/* Mensaje de error si la API falla */}
                    {error && <p className="text-red-500">Error al cargar los doctores: {error}</p>}

                    {/* Contenedor de doctores */}
                    <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                        {loading ? (
                            <SkeletonSchema grid={6} />
                        ) : filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor: DoctorType) => (
                                <CardDoctor key={doctor.id} doctor={doctor} />
                            ))
                        ) : (
                            <p className="col-span-full text-center">No hay Doctores Disponibles</p>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
