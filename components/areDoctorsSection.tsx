import Link from "next/link"
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
    <section className="max-w-6xl mx-auto px-6 py-16 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div className="flex flex-col gap-6">
          <div className="w-fit bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            {badge}
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p className="text-gray-600 leading-relaxed max-w-lg">
            {description}
          </p>

          {/* Checklist */}
          <div className="flex flex-col gap-3">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-800">{perk}</span>
              </div>
            ))}
          </div>

          <Link
            href={ctaHref ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-primary hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-md"
          >
            {ctaText}
          </Link>
        </div>

        {/* Right — testimonial */}
        {testimonial && (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed italic text-base">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                👨‍⚕️
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AreDoctorsSection;
