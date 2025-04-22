import Link from "next/link";
import Image from "next/image";
import { DoctorType } from "@/types/doctor";
import { CalendarCheck, SquareActivity, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

type ProductDoctorProps = {
  doctor: DoctorType;
};

const CardDoctor = ({ doctor }: ProductDoctorProps) => {
  const imageUrl =
    doctor.image && doctor.image.length > 0
      ? doctor.image[0].url
      : "/placeholder-image.webp";

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <Link href={`/doctor/${doctor.slug}`} className="block">
        <CardHeader className="flex flex-row items-center gap-4">
          <Image
            src={imageUrl}
            alt={doctor.doctorName}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-black">{doctor.doctorName}</h2>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Star color="#e4e802" strokeWidth={2.25} className="mr-1" />
              <span className="font-semibold text-black">{doctor.review + ".0"}</span>
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="flex flex-row md:items-center justify-between gap-4 pt-0 pb-4 px-6">
        {/* Servicios y cirugías */}
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          {doctor.services?.length > 0 && (
            <div className="flex flex-col gap-1">
              {doctor.services.map((s) => (
                <div key={s.id} className="flex items-center gap-1">
                  <Stethoscope className="w-4 h-4" />
                  <span>{s.serviceName}</span>
                </div>
              ))}
            </div>
          )}
          {doctor.surgeries?.length > 0 && (
            <div className="flex flex-col gap-1">
              {doctor.surgeries.map((s) => (
                <div key={s.id} className="flex items-center gap-1">
                  <SquareActivity className="w-4 h-4" />
                  <span>{s.surgeryName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón a la derecha */}
        <div className="self-start">
          <Button
            onClick={() => window.open("https://wa.me/526561100446", "_blank")}
          >
            <CalendarCheck className="mr-2" />
            Solicitar cita
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardDoctor;