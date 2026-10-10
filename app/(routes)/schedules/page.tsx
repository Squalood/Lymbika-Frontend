import type { Metadata } from "next";
import { getSchedulesPage } from "@/api/getSchedulesPage";
import { clean } from "@/lib/utils";
import { ESTADO, HORARIO, ScheduleContent, resolverContenido, telHref, whatsappHref } from "./config";
import { Hero } from "./sections/Hero";
import { BenefitsStrip } from "./sections/BenefitsStrip";
import { ConsultDetails } from "./sections/ConsultDetails";
import { MoreHelp } from "./sections/MoreHelp";
import { Location } from "./sections/Location";
import { Disclaimer } from "./sections/Disclaimer";
import { StickyBar } from "./sections/StickyBar";

const URL = "https://lymbika.com/schedules";
const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSchedulesPage();
  const c = resolverContenido(page);
  return {
    title: clean(page?.seoTitle) ?? `Consulta médica en ${c.ciudad} por $${c.precio} | Farmacia+ by Lymbika`,
    description:
      clean(page?.seoDescription) ??
      `Consulta médica presencial con médico general en ${c.ciudad} por $${c.precio} MXN. Aparta tu cita en línea, por WhatsApp o por teléfono.`,
    alternates: { canonical: URL },
    openGraph: {
      title: `Consulta médica presencial por $${c.precio} | Farmacia+ by Lymbika`,
      description: c.subtitulo,
      type: "website",
      locale: "es_MX",
    },
  };
}

const hora = (n: number) => `${String(n).padStart(2, "0")}:00`;

function jsonLd(c: ScheduleContent) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: c.nombre,
    brand: { "@type": "Brand", name: "Farmacia+ by Lymbika" },
    telephone: `+${c.telefono}`,
    url: URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.ubicacion.direccion,
      addressLocality: c.ciudad,
      addressRegion: ESTADO,
      addressCountry: "MX",
    },
    hasMap: c.ubicacion.mapsUrl,
    medicalSpecialty: "PrimaryCare",
    openingHoursSpecification: Object.entries(HORARIO).flatMap(([dia, h]) =>
      h ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: DIAS[Number(dia)], opens: hora(h[0]), closes: hora(h[1]) }] : []
    ),
    makesOffer: { "@type": "Offer", name: "Valoración médica presencial", price: c.precio, priceCurrency: "MXN" },
  };
}

export default async function SchedulesPage() {
  // Si Strapi falla o el single type aún no existe, la página sale con los
  // defaults de config.ts en lugar de romperse.
  const content = resolverContenido(await getSchedulesPage());

  return (
    <main className="pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(content)) }} />
      <Hero content={content} />
      <BenefitsStrip items={content.beneficios} />
      <ConsultDetails content={content} />
      <MoreHelp content={content} />
      <Location content={content} />
      <Disclaimer content={content} />
      <StickyBar
        hrefs={{ agendar: content.calendario, whatsapp: whatsappHref(content), llamar: telHref(content) }}
      />
    </main>
  );
}
