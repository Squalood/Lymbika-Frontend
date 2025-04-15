import { Button } from "@/components/ui/button";
import { DoctorType } from "@/types/doctor";
import { CalendarCheck, SquareActivity, Star, Stethoscope } from "lucide-react";
import Image from "next/image";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const DoctorTop = (props: InfoDoctorProps) => {
  const { doctor } = props;

  const imageUrl =
    doctor.image && doctor.image.length > 0
      ? doctor.image[0].url
      : "/placeholder-image.webp";

  return (
    <div className="flex flex-col">
      <div className="w-full rounded-t-lg overflow-hidden">
        {doctor.bannerImage?.url ? (
          <Image
            src={doctor.bannerImage.url}
            alt={doctor.doctorName}
            width={1200}
            height={400}
            className="w-full h-40 sm:h-56 object-cover"
            priority
          />
        ) : (
          <div className="w-full h-40 sm:h-56 bg-gray-200" />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-start gap-4 p-6">
          {/* Imagen del doctor */}
          <img
            src={imageUrl}
            alt={doctor.doctorName}
            className="w-16 h-16 rounded-full object-cover"
          />
          {/* Información del doctor */}
          <div>
            <h2 className="text-xl font-semibold text-black">
              {doctor.doctorName}
            </h2>

            {/* Calificación */}
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="mr-1">
                <Star color="#e4e802" strokeWidth={2.25} />
              </span>
              <span className="font-semibold text-black">{doctor.review}</span>
            </div>

            {/* Especialidades */}
            <div className="flex flex-col gap-1 text-sm text-gray-500 mt-2">
              {doctor.services?.length > 0 && (
                <div className="flex items-center gap-2">
                  <Stethoscope />
                  <div className="flex gap-1 flex-wrap">
                    {doctor.services.map((s) => (
                      <span key={s.id}>{s.serviceName}</span>
                    ))}
                  </div>
                </div>
              )}
              {doctor.surgeries?.length > 0 && (
                <div className="flex items-center gap-2">
                  <SquareActivity />
                  <div className="flex gap-1 flex-wrap">
                    {doctor.surgeries.map((s) => (
                      <span key={s.id}>{s.surgeryName}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6 md:mb-0 md:w-48">
          <Button
            className="w-1/2 md:w-full mr-0 md:mr-8"
            onClick={() => window.open("https://wa.me/526561100446", "_blank")}
          >
            <CalendarCheck className="mr-2" />
            Solicitar cita
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorTop;
