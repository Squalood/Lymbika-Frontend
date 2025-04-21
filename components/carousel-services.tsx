"use client";
import { ResponseType } from "@/types/response";
import { useGetServices } from "@/api/getService";
import { useGetSugery } from "@/api/getSugery";
import { ServiceType } from "@/types/service";
import { SugeryType } from "@/types/sugery";
import CarouselComponent from "./carousel-circles";

const CarouselServices = () => {  //separar ese componente indicando si es de services o surgeries con interface
    const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();
    const { result: surgeryResult, loading: surgeryLoading }: ResponseType = useGetSugery();

    // Transformamos los datos individualmente
    const serviceItems = (servicesResult || []).map((service: ServiceType) => ({
        id: `service-${service.id}`,
        name: service.serviceName,
        imageUrl: service.image?.url,
        slug: service.slug,
    }));

    const surgeryItems = (surgeryResult || []).map((surgery: SugeryType) => ({
        id: `surgery-${surgery.id}`,
        name: surgery.surgeryName,
        imageUrl: surgery.image?.url,
        slug: surgery.slug,
    }));

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {/* Carrusel de Servicios Médicos */}
            <h3 className="px-6 text-3xl sm:pb-8">Especialidades</h3>
            <CarouselComponent items={serviceItems} loading={servicesLoading} />

            {/* Carrusel de Cirugías */}
            <h3 className="px-6 text-3xl sm:pb-8 mt-10">Cirugías destacadas</h3>
            <CarouselComponent items={surgeryItems} loading={surgeryLoading} />
        </div>
    );
};

export default CarouselServices;
