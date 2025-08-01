import Link from "next/link";
import { ClinicType } from "@/types/clinic";
import { ChevronRight, Stethoscope, HeartPulse, Brain, ScanHeart } from "lucide-react";

type ClinicsListProps = {
  data: ClinicType[];
};

const iconMap = [
  <HeartPulse size={40} className="text-primary group-hover:scale-125 transition-transform" />,
  <Stethoscope size={40} className="text-primary group-hover:scale-125 transition-transform" />,
  <ScanHeart size={40} className="text-primary group-hover:scale-125 transition-transform" />,
  <Brain size={40} className="text-primary group-hover:scale-125 transition-transform" />
];


export default function Clinics({ data }: ClinicsListProps) {
  if (!data || data.length === 0) return null;

  const bigCards = data.slice(0, 2);
  const smallCards = data.slice(2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl">Nuestras Clínicas</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Tarjetas grandes */}
        {bigCards.map((clinic) => (
          <Link
            key={clinic.id}
            href={`/clinics/${clinic.slug}`}
            className="group relative flex flex-col rounded-xl bg-cover bg-center text-white flex-[1_1_60%] sm:flex-[1_1_40%] sm:hover:flex-[2_1_58%] h-44 md:h-60 transition-all duration-500 ease-in-out"
            style={{
              backgroundImage: `url(${clinic.heroImage?.url || "/placeholder.jpg"})`,
            }}
          >
            <div className="flex-auto p-6 pb-0 text-white/90">
              <h3 className="text-base md:text-xl group-hover:text-white">{clinic.title}</h3>
              <span className="font-bold">{clinic.heroSubtitle}</span>
            </div>
            <div className="p-4 pt-0">
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium group-hover:text-white/70">
                Ver detalles
                <ChevronRight size={20} />
              </div>
            </div>
          </Link>
        ))}

        {/* Tarjetas pequeñas */}
        {smallCards.map((clinic, i) => (
          <Link
            key={clinic.id}
            href={`/clinics/${clinic.slug}`}
            className="group flex flex-col justify-end bg-muted rounded-xl h-40 p-4 text-gray-800 flex-[1_1_45%] sm:flex-[1_1_22%] transition-all"
          >
            <div className="flex flex-col gap-1">
              {iconMap[i % iconMap.length]} {/* ← aquí se rota automáticamente */}
              <h3 className="text-lg font-semibold group-hover:text-gray-600">{clinic.title}</h3>
              <span className="text-muted-foreground text-sm">{clinic.heroSubtitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}