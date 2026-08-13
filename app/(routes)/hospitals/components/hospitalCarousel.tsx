"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { HospitalType } from "@/types/hospital";
import HospitalCardSimple from "./hospitalCardSimple";

interface HospitaSectionProps {
  hospitals: HospitalType[];
}

const HospitaCarousel = ({ hospitals }: HospitaSectionProps) => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {hospitals.map((hospital) => (
            <CarouselItem key={hospital.id} className="basis-[85%] sm:basis-[50%] md:basis-[33%]">
              <HospitalCardSimple hospital={hospital} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* static + translate-y-0 anulan el posicionamiento absoluto (-left-12 / -right-12)
            que sacaba las flechas de la pantalla en móvil */}
        <div className="flex justify-center gap-4 mt-4">
          <CarouselPrevious className="static translate-y-0 h-10 w-10" />
          <CarouselNext className="static translate-y-0 h-10 w-10" />
        </div>
      </Carousel>
    </div>
  );
};

export default HospitaCarousel;
