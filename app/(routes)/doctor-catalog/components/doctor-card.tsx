import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import { DoctorType } from "@/types/doctor";
import { SquareActivity, Stethoscope } from "lucide-react";
import Image from "next/image";

type ProductDoctorProps = {
  doctor: DoctorType;
};

const CardDoctor = ({ doctor }: ProductDoctorProps) => {
  return (
    <Link
      href={`/doctor/${doctor.slug}`}
      className="relative p-2 transition-all duration-200 rounded-lg hover:shadow-md"
    >
      {/* Servicio y cirugía del doctor */}
      <div className="absolute flex flex-col gap-1 px-2 z-[1] top-4 left-2 bg-white bg-opacity-70 p-1 rounded-md">
        {doctor.services?.map((s) => (
          <p
            key={s.id}
            className="px-2 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1"
          >
            <Stethoscope size={16} />
            {s.serviceName}
          </p>
        ))}

        {doctor.surgeries?.map((s) => (
          <p
            key={s.id}
            className="px-2 py-1 text-xs font-semibold text-gray-500 flex items-center gap-1"
          >
            <SquareActivity size={16} />
            {s.surgeryName}
          </p>
        ))}
      </div>

      {/* Carrusel de imágenes con Next/Image */}
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {(doctor.image?.length > 0 ? doctor.image : [{ id: "placeholder", url: "/placeholder-image.webp" }])
            .map((image) => (
              <CarouselItem key={image.id} className="group relative w-full h-48 rounded-xl overflow-hidden">
                <Image
                  src={image.url || "/placeholder-image.webp"}
                  alt={doctor.doctorName}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover rounded-xl"
                  priority
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      {/* Nombre del doctor y calificación */}
      <div className="text-center mt-2">
        <p className="text-lg font-semibold">{doctor.doctorName}</p>
      </div>
    </Link>
  );
};

export default CardDoctor;