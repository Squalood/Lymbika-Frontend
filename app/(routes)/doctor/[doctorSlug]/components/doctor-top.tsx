import { DoctorType } from "@/types/doctor"
import { SquareActivity, Star, Stethoscope } from "lucide-react";

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
    <div className="flex items-start gap-4 p-6">
      {/* Imagen del doctor */}
      <img
        src={imageUrl}
        alt={doctor.doctorName}
        className="w-16 h-16 rounded-full object-cover"
      />

      {/* Información del doctor */}
      <div>
        <h2 className="text-xl font-semibold text-black">{doctor.doctorName}</h2>

        {/* Calificación */}
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <span className="mr-1">
            <Star color="#e4e802" strokeWidth={2.25} />
          </span>
          <span className="font-semibold text-black">{doctor.review}</span>
        </div>

        {/* Especialidades */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
          {doctor.service && (
            <div className="flex items-center gap-1">
              <Stethoscope />
              <span>{doctor.service.serviceName}</span>
            </div>
          )}
          {doctor.surgery && (
            <div className="flex items-center gap-1">
              <SquareActivity />
              <span>{doctor.surgery.surgeryName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorTop;
