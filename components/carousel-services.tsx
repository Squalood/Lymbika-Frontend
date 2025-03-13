"use client";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { Card } from "./ui/card";
import { useGetServices } from "@/api/getService";
import { useGetSugery } from "@/api/getSugery";
import { ServiceType } from "@/types/service";
import { SugeryType } from "@/types/sugery";
import Link from "next/link";
import Image from "next/image";

const CarouselServices = () => {
    const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();
    const { result: surgeryResult, loading: surgeryLoading }: ResponseType = useGetSugery();

    const allItems = [
        ...(servicesResult || []).map((service: ServiceType) => ({
            id: `service-${service.id}`, // Prefijo "service-" para evitar colisiones
            name: service.serviceName,
            imageUrl: service.image?.url,
            slug: service.slug,
            type: "service",
        })),
        ...(surgeryResult || []).map((surgery: SugeryType) => ({
            id: `surgery-${surgery.id}`, // Prefijo "surgery-" para evitar colisiones
            name: surgery.surgeryName,
            imageUrl: surgery.image?.url,
            slug: surgery.slug,
            type: "surgery",
        })),
    ];

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8">Servicios Médicos y Cirugías</h3>

            <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {(servicesLoading || surgeryLoading) && <SkeletonSchema grid={3} />}
                    {allItems.map((item) => (
                        <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 group">
                        <div className="flex justify-center p-4">
                            <Link href={`/service/${item.slug}`} className="relative w-40 h-40 sm:w-48 sm:h-48">
                                <Card className="relative w-full h-full overflow-hidden rounded-full shadow-lg border-none">
                                    {/* Imagen de fondo */}
                                    {item.imageUrl && (
                                        <Image 
                                            src={item.imageUrl} 
                                            alt={item.name} 
                                            layout="fill" 
                                            objectFit="cover" 
                                            className="absolute inset-0 rounded-full"
                                        />
                                    )}
                                    {/* Texto centrado con fondo semi-transparente */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white text-lg font-bold text-center bg-black/60 px-3 py-1 rounded-lg">
                                            {item.name}
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    </CarouselItem>
                    
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
};

export default CarouselServices;
