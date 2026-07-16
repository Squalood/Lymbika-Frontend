import Link from "next/link"
import { LandingPageJson } from "@/types/landingPageJson"
import ChatDemo from "@/components/chat-demo"
import PlanSectionAlt from "@/app/(routes)/membership/components/plansSectionAlt"

type AlyusSectionProps = NonNullable<LandingPageJson["alyusSection"]>

const AlyusSection = ({
  badge,
  label,
  title,
  description,
  chatFooter,
  ctaText,
  ctaHref,
  features = [],
  messages = [],
}: AlyusSectionProps) => {
  if (!title) return (
    <section className="bg-gradient-to-br from-[#0c1a5e] to-[#162d96] py-16 mb-8">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm text-white/50">No se pudieron cargar los datos de esta sección.</p>
      </div>
    </section>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1a5e] to-[#162d96] py-16 md:py-20 mb-8">
      <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-white/[0.03] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 md:gap-14 items-center">

          {/* Text */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-blue-300 mb-2.5">
              {label}
            </p>

            <h2
              className="text-3xl md:text-[42px] font-black text-white leading-[1.1] tracking-tight mb-4"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <p className="text-base text-white/70 leading-relaxed mb-6 max-w-md">
              {description}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-3.5">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-0.5">{f.title}</p>
                    <p className="text-[13px] text-white/60 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA deshabilitado temporalmente */}
            {false && ctaText && (
              <Link
                href={ctaHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 bg-white hover:-translate-y-0.5 hover:shadow-xl transition-all text-[#0c1a5e] text-sm font-bold py-3 px-6 rounded-xl mt-6"
              >
                {ctaText}
              </Link>
            )}
          </div>

          {/* Visual — chat mockup */}
          <ChatDemo status={badge} messages={messages} footer={chatFooter} />

        </div>

        {/* Health Pass pricing */}
        <PlanSectionAlt />
      </div>
    </section>
  );
};

export default AlyusSection;