"use client"

import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export const dataCarouselTop = [
    {
        id: 1,
        title: "Title 1",
        link: "#!",
        imageUrl: "https://www.starmedica.com/resource/1685036771000/iconosFooter/LogoFooterStarMedica.svg"
    },
    {
        id: 2,
        title: "emma",
        link: "#!",
        imageUrl: "https://ema-med.mx/assets/content/logo.svg"
    },
];

const CarouselPartner = () => {
    const router = useRouter();

    return ( 
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2500
                    })
                ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link, imageUrl }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                        {imageUrl && (
                                            <div className="relative w-full h-12 sm:h-20 my-4">
                                                <Image 
                                                    src={imageUrl} 
                                                    alt={title} 
                                                    layout="fill" 
                                                    objectFit="contain" 
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}    
                </CarouselContent>
            </Carousel>
        </div>
     );
};
 
export default CarouselPartner;
