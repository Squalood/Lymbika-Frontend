"use client"

import Marquee from "react-fast-marquee"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, BadgeCheck, Clock, GraduationCap, Shield, CreditCard, Hospital, Stethoscope, MessageCircleHeart, BookUser, ShieldCheck, Plane } from "lucide-react"
import React from "react"
import es from "@/locals/es.json"

export const dataCarouselTop = [
    {
        id: 1,
        title: es.autoCarrouselBanner.id1,
        link: "#!",
        icon: <BadgeCheck size={32}/>
    },
    {
        id: 2,
        title: es.autoCarrouselBanner.id2,
        link: "#!",
        icon: <ShoppingBag size={32}/>, 
    },
    {
        id: 3,
        title: es.autoCarrouselBanner.id3,
        link: "#!",
        icon: <Clock size={32}/>, 
    },
    {
        id: 4,
        title: es.autoCarrouselBanner.id4,
        link: "#!",
        icon: <GraduationCap size={32}/>, 
    },
    {
        id: 5,
        title: es.autoCarrouselBanner.id5,
        link: "#!",
        icon: <Shield size={32}/>, 
    },
    {
        id: 6,
        title: es.autoCarrouselBanner.id6,
        link: "#!",
        icon: <CreditCard size={32}/>, 
    },
    {
        id: 7,
        title: es.autoCarrouselBanner.id7,
        link: "#!",
        icon: <Stethoscope size={32}/>, 
    },
    {
        id: 8,
        title: es.autoCarrouselBanner.id8,
        link: "#!",
        icon: <Hospital size={32}/>, 
    },
    {
        id: 9,
        title: es.autoCarrouselBanner.id9,
        link: "#!",
        icon: <MessageCircleHeart size={32}/>, 
    },
    {
        id: 10,
        title: es.autoCarrouselBanner.id10,
        link: "#!",
        icon: <BookUser size={32}/>, 
    },
    {
        id: 11,
        title: es.autoCarrouselBanner.id11,
        link: "#!",
        icon: <ShieldCheck size={32}/>, 
    },
    {
        id: 12,
        title: es.autoCarrouselBanner.id12,
        link: "#!",
        icon: <Plane size={32}/>, 
    }
];

const CarouselTextBanner = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-200 dark:bg-primary py-4">
            <Marquee
                gradient={false} // sin bordes sombreados
                speed={40} // ajusta la velocidad
                pauseOnHover={true} // opcional
            >
                {dataCarouselTop.map(({ id, title, link, icon }) => (
                    <div
                        key={id}
                        onClick={() => router.push(link)}
                        className="cursor-pointer mx-4 min-w-[250px] flex justify-center items-center"
                    >
                        <Card className="shadow-none border-none bg-transparent">
                            <CardContent className="flex flex-row justify-center items-center gap-2 py-0 text-center">
                                {React.cloneElement(icon, { className: "text-primary w-4 h-4" })}
                                <p className="sm:text-base text-xs text-wrap dark:text-secondary">
                                    {title}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Marquee>
        </div>
    )
};

export default CarouselTextBanner;
