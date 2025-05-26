"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

const promoItems = [
  { src: "/promos/LYMBIKA FARMACIAS2.jpg", href: "/shop" },
  { src: "/promos/LYMBIKA FARMACIAS3.jpg", href: "/shop" },
  { src: "/promos/LYMBIKA FARMACIAS4.jpg", href: "/shop" },
  { src: "/promos/1.png", href: "/category/cuidado-belleza" },
  { src: "/promos/2.png", href: "/category/cuidado-belleza" },
  { src: "/promos/3.png", href: "/category/cuidado-belleza" },
  { src: "/promos/LYMBIKA-MedicinasACostoProveedor.jpg", href: "/membership" },
];

const PromoCarousel = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 my-8">
      <h1 className="py-4 font-bold text-xl">Nuestras últimas promociones</h1>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 4000 })]}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {promoItems.map((item, i) => (
            <CarouselItem
              key={i}
              className="pl-2 basis-2/3 sm:basis-1/2 md:basis-1/3"
            >
              <Link href={item.href} className="block relative aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={item.src}
                  alt={`Promo ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PromoCarousel;