"use client";

import { useGetDoctors } from "@/api/getDoctor";
import { DoctorType } from "@/types/doctor";
import CardDoctor from "./doctor-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SkeletonDoctorCardVertical from "@/components/skeleton/skeletonDoctorCardVertical";

interface DoctorReelProps {
  doctors?: DoctorType[];
  title?: string;
  actionType?: "view" | "review";
  userId?: number;
}

const DoctorReel = ({ doctors: externalDoctors, title = "Nuestros Doctores", actionType = "view", userId }: DoctorReelProps) => {
  const { doctors: fetchedDoctors, loading, error } = useGetDoctors();

  // Usar doctores externos si se proporcionan, sino usar los obtenidos del hook
  const doctors = externalDoctors || fetchedDoctors;

  if (!externalDoctors && loading) {
    return (
      <div className="max-w-6xl mx-auto ">
          <SkeletonDoctorCardVertical/>
      </div>
    );
  }

  if (!externalDoctors && error) return <p className="text-center text-red-500">Error al cargar los doctores.</p>;

  const doctorsWithReviews = doctors.filter(
    (doctor) => doctor.reviews && doctor.reviews.length > 0
  );

  return (
    <div className="px-4 py-2 sm:px-6 lg:px-8 mx-auto max-w-6xl">
      <h1 className="px-0 py-6 text-3xl">{title}</h1>
      {doctorsWithReviews.length === 0 ? (
        <p className="text-center text-muted-foreground">No se encontraron doctores.</p>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {doctorsWithReviews.map((doctor) => (
              <CarouselItem
                key={doctor.id}
                className="basis-[85%] sm:basis-[50%] md:basis-[33%]"
              >
                <CardDoctor doctor={doctor} actionType={actionType} userId={userId} />
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
