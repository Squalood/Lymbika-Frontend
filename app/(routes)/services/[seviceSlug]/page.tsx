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
    const serviceSlug = params.serviceSlug as string || ''; 

    const { result, loading }: ResponseType = useGetServiceDoctor(serviceSlug);
    const [serviceFilter, setServiceFilter] = useState("");

    useEffect(() => {
        console.log("Resultado de la API:", result);
    }, [result]);

    const filteredService = (result && Array.isArray(result) && !loading) 
        ? (serviceFilter === "" 
            ? result 
            : result.filter((doctor: DoctorType) => doctor.service?.serviceName === serviceFilter)) 
        : [];

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <Separator />
            
            <div className="sm:flex sm:justify-between hidden">
                <FiltersControlsService setFilterService={setServiceFilter} />

                <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                    {loading && <SkeletonSchema grid={6} />}

                    {filteredService.length > 0 ? (
                        filteredService.map((doctor: DoctorType) => (
                            <CardDoctor key={doctor.id} doctor={doctor} />
                        ))
                    ) : (
                        !loading && <p>No hay Doctores Disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
}
