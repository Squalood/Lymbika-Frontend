import Image from "next/image";
import { PageType } from "@/types/pages";
import { LandingPageJson } from "@/types/landingPageJson";

type MedicalHeroProps = {
  hero: PageType["hero"];
  stats?: LandingPageJson["doctoresHeroStats"];
};

const MedicalHero = ({ hero, stats }: MedicalHeroProps) => {
  if (!hero) return null;

  return (
    <section className="w-full py-6 px-3 md:py-10 md:px-8">
      {/* Card contenedora con fondo navy */}
      <div className="relative bg-[#0b1630] rounded-2xl overflow-hidden max-w-6xl mx-auto px-5 py-8 md:px-8 md:py-12">
        {/* Círculos decorativos de fondo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#1a2f5e]/60 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full bg-[#1e3a7a]/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          {/* Columna izquierda */}
          <div className="space-y-5 md:space-y-8">
            {/* Badge */}
            <span className="inline-block bg-[#1a2f5e] text-[#7eb3f5] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-[#2a4a8a]">
              Para médicos especialistas
            </span>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              {hero.title}
            </h1>

            {/* Descripción */}
            <p className="text-[#8fa8cc] text-sm md:text-base leading-relaxed max-w-md">
              {hero.description}
            </p>

            {/* Stats */}
            <div className="flex gap-0 pt-1">
              {stats?.map((stat, i) => (
                <div
                  key={i}
                  className={`pr-4 md:pr-6 ${i > 0 ? "pl-4 md:pl-6 border-l border-[#2a4a8a]" : ""}`}
                >
                  <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[#7eb3f5] text-xs mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: Imagen */}
          {hero.image?.url && (
            <div className="relative w-full h-[220px] md:h-[320px] lg:h-[380px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={hero.image.url}
                alt={hero.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1630]/30 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MedicalHero;