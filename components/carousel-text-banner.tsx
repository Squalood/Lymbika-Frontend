"use client"

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay"
import { Pill, ShoppingBag, CreditCard } from "lucide-react";
import React from "react";

export const dataCarouselTop = [
    {
        id: 1,
        title: "Solicita tu crema y te llega en 24 horas",
        link: "#!",
        icon: <Pill />, // Ícono de pastilla
    },
    {
        id: 2,
        title: "Compra tu medicamento a precio de proveedor",
        link: "#!",
        icon: <ShoppingBag />, // Ícono de bolsa de compras
    },
    {
        id: 3,
        title: "Paga tu cirugía a meses",
        link: "#!",
        icon: <CreditCard />, // Ícono de tarjeta de crédito
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
                                    {React.cloneElement(icon, { className: "text-primary"})}
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
