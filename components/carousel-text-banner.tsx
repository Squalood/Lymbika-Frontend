"use client"

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay"
import { ShoppingBag, BadgeCheck, Clock, GraduationCap, Shield } from "lucide-react";
import React from "react";

export const dataCarouselTop = [
    {
        id: 1,
        title: "Más del 90% de satisfacción",
        link: "#!",
        icon: <BadgeCheck size={32}/>
    },
    {
        id: 2,
        title: "Compra tu medicamento a precio de proveedor",
        link: "#!",
        icon: <ShoppingBag size={32}/>, // Ícono de bolsa de compras
    },
    {
        id: 3,
        title: "No más esperas",
        link: "#!",
        icon: <Clock size={32}/>, // Ícono de tarjeta de crédito
    },
    {
        id: 4,
        title: "Especialistas certificados",
        link: "#!",
        icon: <GraduationCap size={32}/>, // Ícono de tarjeta de crédito
    },
    {
        id: 5,
        title: "No se requiere aseguranza",
        link: "#!",
        icon: <Shield size={32}/>, // Ícono de tarjeta de crédito
    },
];



const CarouselTextBanner = () => {
    const router = useRouter();

    return ( 
        <div className="bg-gray-200 dark:bg-primary ">
            <Carousel 
                className="w-full max-w-4xl mx-auto py-5"
                plugins={[Autoplay({ delay: 2500 })]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, icon }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <Card className="shadow-none border-none bg-transparent">
                                <CardContent className="flex flex-row justify-center items-center gap-2 p-2 text-center">
                                    {React.cloneElement(icon , { className: "text-primary"},)}
                                    <p className="sm:text-lg text-lg text-wrap dark:text-secondary"> 
                                        {title}
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}    
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default CarouselTextBanner;
