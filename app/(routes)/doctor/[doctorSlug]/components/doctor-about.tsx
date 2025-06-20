import { DoctorType } from "@/types/doctor";
import DoctorVideos from "./doctorVideos";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const DoctorAbout = (props: InfoDoctorProps) => {
  const { doctor } = props;
  const videos = doctor.videos || [];

  return (
    <div className="p-4">
      {/* Descripción larga */}
      <div className="space-y-4 mb-6">
        <p className="text-sm leading-relaxed">
          {doctor.about}
        </p>
      </div>

      {/* Información de columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-semibold mb-1">Especialidades</p>
          {doctor.services?.length > 0 ? (
            doctor.services.map((s) => (
              <span key={s.id} className="block">{s.serviceName}</span>
            ))
          ) : (
            <span>No disponible</span>
          )}
        </div>
        <div>
          <p className="font-semibold mb-1">Ubicación</p>
          <p>{doctor.location}</p>
        </div>
        <div>
          <p className="font-semibold mb-1">Cirugías</p>
          {doctor.surgeries?.length > 0 ? (
            doctor.surgeries.map((s) => (
              <span key={s.id} className="block">{s.surgeryName}</span>
            ))
          ) : (
            <span>No disponible</span>
          )}
        </div>
        <div>
          <p className="font-semibold mb-1">Idiomas hablados</p>
          <p>{doctor.languagesSpoken}</p>
        </div>
      </div>
      <div className="pt-8">
        {videos.length > 0 && (
          <DoctorVideos videos={videos} doctorName={doctor.doctorName} />
        )}
      </div>
    </div>
  );
};

export default DoctorAbout;