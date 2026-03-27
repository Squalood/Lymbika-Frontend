import { DoctorType } from "@/types/doctor";
import DoctorVideos from "./doctorVideos";
import { CheckCircle, ChevronDown } from "lucide-react";
import RichTextRenderer from "@/components/rich-text-renderer";
import { useState } from "react";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const DoctorAbout = (props: InfoDoctorProps) => {
  const { doctor } = props;
  const videos = doctor.videos || [];
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4">
      {/* Descripción larga */}
      <div className="space-y-4 mb-6">
        <p className="text-sm leading-relaxed">
          {doctor.about}
        </p>
      </div>

      {/* Información de columnas o Experiencia */}
      {doctor.experience?.length > 0 ? (
        <div className="text-sm">
          <div className={`relative overflow-hidden transition-all duration-500 ${expanded ? "max-h-none" : "max-h-64"}`}>
            <RichTextRenderer content={doctor.experience} />
            {!expanded && (
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            )}
          </div>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-3 flex items-center gap-1 text-primary text-sm font-medium hover:underline"
          >
            {expanded ? "Ver menos" : "Ver más"}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      ) : (
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
          <div>
            {/* Mostrar Certificado */}
              <p className="w-full flex justify-center gap-2 text-xs lg:text-sm font-semibold text-green-400 bg-green-100 py-2 px-2 rounded-full">
                <CheckCircle size={32} className="text-green-400" />
                Certificación por el Consejo Mexicano de Especialidades Médicas
              </p>
          </div>
        </div>
      )}
      <div className="pt-8">
        {videos.length > 0 && (
          <DoctorVideos videos={videos} doctorName={doctor.doctorName} />
        )}
      </div>
    </div>
  );
};

export default DoctorAbout;