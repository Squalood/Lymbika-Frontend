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

    // Estados de filtros
    const [serviceFilter, setServiceFilter] = useState("");
    const [surgeryFilter, setSurgeryFilter] = useState("");

    // Efecto para seleccionar automáticamente el filtro basado en el slug
    useEffect(() => {
        if (!loading && result?.length > 0) {
            const firstDoctor = result[0]; // Tomamos el primer doctor para referencia

            // Detectamos si el slug pertenece a un servicio o una cirugía y lo establecemos como filtro
            if (firstDoctor.service?.slug === serviceSlug) {
                setServiceFilter(firstDoctor.service.serviceName);
                setSurgeryFilter(""); // Limpiamos el filtro de cirugía
            } else if (firstDoctor.surgery?.slug === serviceSlug) {
                setSurgeryFilter(firstDoctor.surgery.surgeryName);
                setServiceFilter(""); // Limpiamos el filtro de servicio
            }
        }
    }, [result, loading, serviceSlug]);

    // Filtrar doctores según los filtros activos
    const filteredDoctors = (Array.isArray(result) && !loading)
        ? result.filter((doctor: DoctorType) =>
            (serviceFilter === "" || doctor.service?.serviceName === serviceFilter) &&
            (surgeryFilter === "" || doctor.surgery?.surgeryName === surgeryFilter)
        )
        : [];

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {/* Mostrar el título basado en el slug */}
            {/*!loading && result?.length > 0 && (
                <h1 className="text-3xl font-medium mb-4">
                    {result[0].service?.serviceName || result[0].surgery?.surgeryName || "Servicio/Cirugía Desconocido"}
                </h1>
            )*/}
            <Separator />

            <div className="flex flex-col sm:flex-row sm:gap-10">
                {/* Filtros */}
                <div className="w-full sm:w-1/3">
                    <FiltersControlsService 
                        setFilterService={setServiceFilter} 
                        setFilterSurgery={setSurgeryFilter} 
                        serviceFilter={serviceFilter}
                        surgeryFilter={surgeryFilter}
                    />
                </div>

                {/* Contenedor de doctores */}
                <div className="w-full sm:w-2/3">
                    {error && <p className="text-red-500">Error al cargar los doctores: {error}</p>}

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
