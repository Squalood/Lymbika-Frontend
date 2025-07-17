"use client";

import { useGetDoctors } from "@/api/getDoctor";
import CardDoctor from "./doctor-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const DoctorReel = () => {
  const { doctors, loading, error } = useGetDoctors();

  if (loading) {
    // Puedes hacer un skeleton carousel con 3 elementos como placeholder
    /*
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <SkeletonDoctorCard key={index} />
          ))}
        </div>
      </div>
    );
   */
  }

  if (error) return <p className="text-center text-red-500">Error al cargar los doctores.</p>;

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-4xl">
      <h1 className="px-0 py-6 text-3xl">Nuestros Doctores</h1>
      <Carousel className="w-full">
        <CarouselContent>
          {doctors.map((doctor) => (
            <CarouselItem key={doctor.id} className="basis-[85%] sm:basis-[50%] md:basis-[33%]">
              <CardDoctor doctor={doctor} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden md:flex justify-center gap-4 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default DoctorReel;
