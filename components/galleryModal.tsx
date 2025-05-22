"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

type ImageType = {
  id: number;
  url: string;
  name?: string;
};

type Props = {
  images: ImageType[];
  startIndex: number;
  onClose: () => void;
};

const GalleryModal = ({ images, startIndex, onClose }: Props) => {

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full p-2 z-50"
        >
          <X />
        </button>

        <Carousel
          opts={{ startIndex }}
          className="w-full h-full"
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={img.id} className="flex justify-center">
                <Image
                  src={img.url}
                  alt={img.name || `Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="rounded-lg object-contain max-h-[80vh] w-auto"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default GalleryModal;
