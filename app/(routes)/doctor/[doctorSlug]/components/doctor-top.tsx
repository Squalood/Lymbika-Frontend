import { Button } from "@/components/ui/button";
import { DoctorType } from "@/types/doctor";
import { CalendarCheck, CheckCircle, SquareActivity, Star, Stethoscope } from "lucide-react";
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
          <div />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-start gap-4 p-6">
          {/* Imagen del doctor */}
          <Image
              src={imageUrl}
              alt={doctor.doctorName}
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-cover"
          />
          {/* Información del doctor */}
          <div>
            <div className="flex flex-col lg:flex-row">
              <h2 className="text-xl font-semibold text-black">
                {doctor.doctorName}
              </h2>
              {/* Mostrar "Agente Médico" solo si tiene Medicina General */}
              {doctor.services?.some((s) => s.serviceName === "Medicina General ") && (
                <p className="ml-3 mx-auto w-40 flex justify-center gap-2 text-xs lg:text-sm font-semibold text-primary bg-blue-100 py-2 px-2 rounded-full">
                  <CheckCircle size={16} className="text-primary" />
                  Agente Médico
                </p>
              )}
            </div>
            
            {/* Calificación */}
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="mr-1">
                <Star color="#e4e802" strokeWidth={2.25} />
              </span>
              <span className="font-semibold text-black">{doctor.review + ".0"}</span>
            </div>

            {/* Especialidades y cirujias */}
            <div className="flex flex-col gap-1 text-sm text-gray-500 mt-2">
            {doctor.services?.length > 0 && (
                <div className="flex flex-col gap-1">
                  {doctor.services.map((s) => (
                    <div key={s.id} className="flex items-center gap-1 text-gray-500 text-sm">
                      <Stethoscope className="w-4 h-4" />
                      <span>{s.serviceName}</span>
                    </div>
                  ))}
                </div>
              )}
              {doctor.surgeries?.length > 0 && (
                <div className="flex flex-col gap-1">
                  {doctor.surgeries.map((s) => (
                    <div key={s.id} className="flex items-center gap-1 text-gray-500 text-sm">
                      <SquareActivity className="w-4 h-4" />
                      <span>{s.surgeryName}</span>
                    </div>
                  ))}
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
