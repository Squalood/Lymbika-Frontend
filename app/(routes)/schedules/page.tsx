import type { Metadata } from "next";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { SUCURSAL } from "./config";
import { Hero } from "./sections/Hero";
import { BenefitsStrip } from "./sections/BenefitsStrip";
import { ConsultDetails } from "./sections/ConsultDetails";
import { MoreHelp } from "./sections/MoreHelp";
import { Location } from "./sections/Location";
import { Disclaimer } from "./sections/Disclaimer";
import { StickyBar } from "./sections/StickyBar";

const URL = "https://lymbika.com/schedules";
const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const metadata: Metadata = {
  title: `Consulta médica en ${SUCURSAL.ciudad} por $${SUCURSAL.precio} | Farmacia+ by Lymbika`,
  description: `Consulta médica presencial con médico general en ${SUCURSAL.ciudad} por $${SUCURSAL.precio} MXN. Aparta tu cita en línea, por WhatsApp o por teléfono.`,
  alternates: { canonical: URL },
  openGraph: {
    title: `Consulta médica presencial por $${SUCURSAL.precio} | Farmacia+ by Lymbika`,
    description: "Empieza aquí. Te valoramos y te ayudamos con el siguiente paso.",
    type: "website",
    locale: "es_MX",
  },
};

const hora = (n: number) => `${String(n).padStart(2, "0")}:00`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: SUCURSAL.nombre,
  brand: { "@type": "Brand", name: "Farmacia+ by Lymbika" },
  telephone: `+${WHATSAPP_NUMBER}`,
  url: URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: SUCURSAL.direccion,
    addressLocality: SUCURSAL.ciudad,
    addressRegion: SUCURSAL.estado,
    addressCountry: "MX",
  },
  hasMap: SUCURSAL.mapsUrl,
  medicalSpecialty: "PrimaryCare",
  openingHoursSpecification: Object.entries(SUCURSAL.horario).flatMap(([dia, h]) =>
    h ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: DIAS[Number(dia)], opens: hora(h[0]), closes: hora(h[1]) }] : []
  ),
  makesOffer: { "@type": "Offer", name: "Valoración médica presencial", price: SUCURSAL.precio, priceCurrency: "MXN" },
};

export default function SchedulesPage() {
  return (
    <main className="pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <BenefitsStrip />
      <ConsultDetails />
      <MoreHelp />
      <Location />
      <Disclaimer />
      <StickyBar />
    </main>
  );
}
