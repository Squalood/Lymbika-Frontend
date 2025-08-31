"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { PageType } from "@/types/pages";

type PromoProps = {
  data: PageType[];
};

const PromoCarousel = ({ data }: PromoProps) => {
  const promoItems = data.flatMap((page) => page.promo);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Sincronizar con Embla API
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="max-w-4xl mx-auto px-4 mt-0 mb-10 sm:mb-0 sm:my-8">
      <h1 className="py-4 font-bold text-xl">Nuestras últimas promociones</h1>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[Autoplay({ delay: 4000 })]}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2">
          {promoItems.map((promo) => (
            <CarouselItem
              key={promo.id}
              className="pl-2 basis-2/3 sm:basis-1/2 md:basis-1/3"
            >
              <Link
                href={promo.link || "#"}
                className="block relative aspect-square w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={promo.image.url}
                  alt={promo.title}
                  fill
                  className="object-cover"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Flechas de navegación */}
        <CarouselPrevious className="left-2 sm:-left-10 bg-white/80 hover:bg-white shadow-md rounded-full" />
        <CarouselNext className="right-2 sm:-right-10 bg-white/80 hover:bg-white shadow-md rounded-full" />
      </Carousel>

      {/* Dots de paginación */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              current - 1 === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;