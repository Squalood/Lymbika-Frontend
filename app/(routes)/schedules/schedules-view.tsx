import type { Metadata } from "next";
import { clean } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";
import { SchedulesPageType } from "@/types/single-types/schedules-page";
import { ESTADO, HORARIO, ScheduleContent, telHref, whatsappHref } from "./config";
import { Hero } from "./sections/hero";
import { BenefitsStrip } from "./sections/benefits-strip";
import { ConsultDetails } from "./sections/consult-details";
import { MoreHelp } from "./sections/more-help";
import { Location } from "./sections/location";
import { Disclaimer } from "./sections/disclaimer";
import { StickyBar } from "./sections/sticky-bar";

/**
 * Las variantes por doctor (/schedules/[slug]) también apuntan aquí su
 * canónica: son la misma landing con otro médico y no deben competir en Google.
 */
const URL = `${SITE_URL}/schedules`;
const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** `conDoctor`: en una variante, el título lleva el nombre del médico en lugar del seoTitle de Strapi. */
export function metadataDe(page: SchedulesPageType | null, c: ScheduleContent, conDoctor = false): Metadata {
  const titulo = conDoctor
    ? `Consulta médica con ${c.medico.nombre} en ${c.ciudad} por $${c.precio} | Farmacia+ by Lymbika`
    : clean(page?.seoTitle) ?? `Consulta médica en ${c.ciudad} por $${c.precio} | Farmacia+ by Lymbika`;
  return {
    title: titulo,
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

export function SchedulesView({ content }: { content: ScheduleContent }) {
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
