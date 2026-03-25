import Link from "next/link"
import { LandingPageJson } from "@/types/landingPageJson"

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
    <section className="bg-gray-950 py-16 mb-8">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm text-gray-500">No se pudieron cargar los datos de esta sección.</p>
      </div>
    </section>
  );

  return (
    <section className="bg-gray-950 py-16 mb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Visual — chat mockup */}
          <div className="bg-gray-900 rounded-2xl p-6 flex flex-col gap-4 border border-gray-800">
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5 text-xs font-medium text-gray-300">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              {badge}
            </div>

            {/* Bubbles */}
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "ai"
                      ? "self-start bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-sm"
                      : "self-end bg-primary text-white rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-1">
              {chatFooter}
            </p>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {label}
            </p>

            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <p className="text-gray-400 leading-relaxed">
              {description}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-xl shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{f.title}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={ctaHref ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit bg-primary hover:bg-blue-700 transition-colors text-white text-sm font-medium py-3 px-6 rounded-lg"
            >
              {ctaText}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AlyusSection;