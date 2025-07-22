"use client";

import { useGetDoctors } from "@/api/getDoctor";
import CardDoctor from "./doctor-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SkeletonDoctorCardVertical from "@/components/skeleton/skeletonDoctorCardVertical";

const DoctorReel = () => {
  const { doctors, loading, error } = useGetDoctors();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto ">
          <SkeletonDoctorCardVertical/>
      </div>
    );
  }

  if (error) return <p className="text-center text-red-500">Error al cargar los doctores.</p>;

  const doctorsWithReviews = doctors.filter(
    (doctor) => doctor.reviews && doctor.reviews.length > 0
  );

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-4xl">
      <h1 className="px-0 py-6 text-3xl">Nuestros Doctores</h1>
      {doctorsWithReviews.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay doctores con reseñas aún.</p>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {doctorsWithReviews.map((doctor) => (
              <CarouselItem
                key={doctor.id}
                className="basis-[85%] sm:basis-[50%] md:basis-[33%]"
              >
                <CardDoctor doctor={doctor} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-center gap-4 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default DoctorReel;
