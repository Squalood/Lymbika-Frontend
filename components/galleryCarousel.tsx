import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
interface GalleryData {
  id: number;
  title: string;
  images: { id: number; url: string }[];
}

interface GalleryCarouselProps {
  gallery?: GalleryData | null;
  loading?: boolean;
}

const GalleryCarousel = ({ gallery, loading }: GalleryCarouselProps) => {
  if (loading || !gallery || !Array.isArray(gallery.images) || gallery.images.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mt-8 md:mt-32">
      <h1 className="px-6 text-3xl mb-8">{gallery.title}</h1>
      <Carousel
        plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      >
        <CarouselContent className="mx-4">
          {gallery.images.map((image) => (
            <CarouselItem key={image.id} className="basis-1/2 pl-4 lg:basis-1/3">
              <div className="relative p-1 overflow-hidden rounded-lg aspect-square">
                <Image
                  src={image.url}
                  alt={gallery.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default GalleryCarousel;
