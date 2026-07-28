import Link from "next/link"
import { Check } from "lucide-react"
import { LandingPageJson } from "@/types/landingPageJson"

type AreDoctorsSectionProps = NonNullable<LandingPageJson["areDoctorsSection"]>

const AreDoctorsSection = ({
  badge,
  title,
  description,
  ctaText,
  ctaHref,
  perks = [],
  testimonial,
}: AreDoctorsSectionProps) => {
  if (!title) return (
    <section className="max-w-6xl mx-auto px-6 py-16 mb-8">
      <p className="text-sm text-gray-400">No se pudieron cargar los datos de esta sección.</p>
    </section>
  );

  return (
    <section className="px-6 py-16 mb-8 bg-gradient-to-br from-[#0c1a5e] to-[#162d96]">
      <div className="relative max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col gap-6">
          <p className="text-xs font-bold uppercase tracking-[2px] text-blue-300 mb-2.5">
            {badge}
          </p>

          <h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p className="text-gray-300 leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Checklist */}
          <div className="flex flex-col gap-3">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm font-semibold text-gray-200">{perk}</span>
              </div>
            ))}
          </div>

          <Link
            href={ctaHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-white hover:-translate-y-0.5 transition-all text-primary text-sm font-semibold py-3 px-6 rounded-lg shadow-md"
          >
            {ctaText}
          </Link>
        </div>

        {/* Right — testimonial */}
        {testimonial && (
          <div className="bg-white/[0.08] border border-white/[0.12] rounded-2xl p-8 flex flex-col gap-6">
            <p className="text-white/80 leading-relaxed italic text-base">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl shrink-0">
                👨‍⚕️
              </div>
              <div>
                <p className="font-bold text-white text-sm">{testimonial.name}</p>
                <p className="text-xs text-white/55">{testimonial.role}</p>
              </div>
            </div>
          </div>
        )}

      </div>
      </div>
    </section>
  );
};

export default AreDoctorsSection;
