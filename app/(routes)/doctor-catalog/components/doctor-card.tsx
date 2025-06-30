import Link from "next/link";
import { DoctorType } from "@/types/doctor";
import { SquareActivity, Stethoscope } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductDoctorProps = {
  doctor: DoctorType;
};

const CardDoctor = ({ doctor }: ProductDoctorProps) => {
  const doctorImage = doctor.image?.length > 0 ? doctor.image[0].url : "/placeholder-image.webp";

  return (
    <Link href={`/doctor/${doctor.slug}`} className="block h-full">
      <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Imagen */}
        <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
          <Image
            src={doctorImage}
            alt={doctor.doctorName}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover"
            priority
          />
        </div>

        {/* Nombre del doctor */}
        <CardContent className="flex-1 flex flex-col p-4">
          <p className="text-base font-semibold text-gray-800">{doctor.doctorName}</p>
          <div className="flex flex-col gap-1 py-2">
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
        </CardContent>

        {/* Footer opcional para futuros botones */}
        <CardFooter className="border-t justify-center pb-1">
          <Button variant="link">Ver más</Button>
        </CardFooter> 
      </Card>
    </Link>
  );
};

export default CardDoctor;