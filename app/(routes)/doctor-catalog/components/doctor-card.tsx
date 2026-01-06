"use client";
import Link from "next/link";
import { DoctorType } from "@/types/doctor";
import { SquareActivity, Stethoscope } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DoctorReviewCarousel from "./doctorReviewCarousel";
import { Separator } from "@/components/ui/separator";
import { ReviewForm } from "@/components/reviewForm";

type ProductDoctorProps = {
  doctor: DoctorType;
  actionType?: "view" | "review";
  userId?: number;
};

const CardDoctor = ({ doctor, actionType = "view", userId }: ProductDoctorProps) => {
  const doctorImage = doctor.image?.length > 0 ? doctor.image[0].url : "/placeholder-image.webp";

  // Si es modo review, renderizar sin Link
  if (actionType === "review") {
    return (
      <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Contenido principal (imagen + nombre + categorías) */}
        <CardContent className="flex gap-4 items-start p-4">
          <div className="min-w-[72px] h-[72px] relative rounded-full overflow-hidden">
            <Image
              src={doctorImage}
              alt={doctor.doctorName}
              fill
              sizes="72px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold text-gray-800">{doctor.doctorName}</p>

            <div className="flex flex-col gap-1 mt-2">
              {doctor.services?.map((service) => (
                <span key={service.id} className="flex items-center gap-1 text-xs text-gray-700 font-medium">
                  <Stethoscope size={14} />
                  {service.serviceName}
                </span>
              ))}
              {doctor.surgeries?.map((surgery) => (
                <span key={surgery.id} className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                  <SquareActivity size={14} />
                  {surgery.surgeryName}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        <Separator className="my-1" />

        {/* Carrusel flexible que se adapta a la altura */}
        <div className="my-auto">
          <DoctorReviewCarousel reviews={doctor.reviews} />
        </div>

        {/* Footer con ReviewForm */}
        <CardFooter className="border-t justify-center pb-1 mt-auto">
          <ReviewForm user={userId} doctor={doctor.id} compact doctorSlug={doctor.slug} />
        </CardFooter>
      </Card>
    );
  }

  // Modo view (comportamiento original con Link)
  return (
    <Link href={`/doctor/${doctor.slug}`} className="block h-full">
      <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Contenido principal (imagen + nombre + categorías) */}
        <CardContent className="flex gap-4 items-start p-4">
          <div className="min-w-[72px] h-[72px] relative rounded-full overflow-hidden">
            <Image
              src={doctorImage}
              alt={doctor.doctorName}
              fill
              sizes="72px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold text-gray-800">{doctor.doctorName}</p>

            <div className="flex flex-col gap-1 mt-2">
              {doctor.services?.map((service) => (
                <span key={service.id} className="flex items-center gap-1 text-xs text-gray-700 font-medium">
                  <Stethoscope size={14} />
                  {service.serviceName}
                </span>
              ))}
              {doctor.surgeries?.map((surgery) => (
                <span key={surgery.id} className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                  <SquareActivity size={14} />
                  {surgery.surgeryName}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        <Separator className="my-1" />

        {/* Carrusel flexible que se adapta a la altura */}
        <div className="my-auto">
          <DoctorReviewCarousel reviews={doctor.reviews} />
        </div>

        {/* Footer fijo abajo*/}
        <CardFooter className="border-t justify-center pb-1 mt-auto">
          <Button variant="link">Ver más</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardDoctor;