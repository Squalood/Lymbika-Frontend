import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Hero from "./components/hero";
import Services from "./components/services";
import WhyUs from "./components/whyUs";
import Doctor from "./components/doctor";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import ClinicGallery from "./components/clinicGallety";
import VideoSection from "./components/videoSection";
import ClinicBreadcrumb from "./components/clinicBreadcrumb";
import FloatingCta from "./components/FloatingCta";
import { ClinicType } from "@/types/clinic";
import { ServiceRateType } from "@/types/medicalService";
import es from "@/locals/es.json";

const colorThemes: Record<string, { primary: string; primaryForeground: string; darkBg: string }> = {
  navy: { primary: "222 60% 12%", primaryForeground: "210 40% 98%", darkBg: "#0b1630" },
  pink: { primary: "330 81% 60%", primaryForeground: "210 40% 98%", darkBg: "#bd195e" },
  green: { primary: "142 71% 45%", primaryForeground: "210 40% 98%", darkBg: "#15803d" },
  red: { primary: "0 84% 60%", primaryForeground: "210 40% 98%", darkBg: "#b91c1c" },
};

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getClinicData(slug: string) {
  const [clinicRes, doctorRes, servicesRes] = await Promise.all([
    fetch(`${BASE}/api/clinics?filters[slug][$eq]=${slug}&populate=*`, { next: { revalidate: 3600 } }),
    fetch(`${BASE}/api/clinics?filters[slug][$eq]=${slug}&populate[doctor][populate]=*`, { next: { revalidate: 3600 } }),
    fetch(`${BASE}/api/clinics?filters[slug][$eq]=${slug}&populate[service_rates][populate][medical_service][populate]=image&populate[service_rates][populate][doctor]=true`, { next: { revalidate: 3600 } }),
  ]);

  const [clinicJson, doctorJson, servicesJson] = await Promise.all([
    clinicRes.json(),
    doctorRes.json(),
    servicesRes.json(),
  ]);

  return {
    clinic: (clinicJson.data[0] ?? null) as ClinicType | null,
    doctorClinic: (doctorJson.data[0] ?? null) as ClinicType | null,
    servicesClinic: (servicesJson.data[0] ?? null) as { service_rates: ServiceRateType[] } | null,
  };
}

type Props = { params: Promise<{ clinicSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clinicSlug } = await params;
  const { clinic } = await getClinicData(clinicSlug);
  if (!clinic) return {};
  return {
    title: `${clinic.title} | Lymbika Healthcare`,
    description: clinic.heroSubtitle,
  };
}

export default async function ClinicPage({ params }: Props) {
  const { clinicSlug } = await params;
  const { clinic, doctorClinic, servicesClinic } = await getClinicData(clinicSlug);

  if (!clinic) notFound();
  if (!doctorClinic?.doctor) notFound();

  const doctor = doctorClinic.doctor;
  const serviceRates = servicesClinic?.service_rates ?? [];
  const t = clinic.pageTexts ?? es.clinics;

  const theme = clinic.colorPage ? colorThemes[clinic.colorPage] : undefined;
  const themeStyle = theme
    ? ({ "--primary": theme.primary, "--primary-foreground": theme.primaryForeground, "--clinic-dark-bg": theme.darkBg } as React.CSSProperties)
    : undefined;

  return (
    <div className="relative" style={themeStyle}>
      <ClinicBreadcrumb clinicTitle={clinic.title} texts={t.breadcrumb} />
      <Hero data={clinic} serviceCount={serviceRates.length} testimonialCount={clinic.testimonials.length} texts={t.hero} />
      {serviceRates.length > 0 && <Services services={serviceRates} texts={t.services} />}
      <WhyUs features={clinic.features} texts={t.whyUs} />
      <Doctor data={doctor} doctorPageSlug={clinic.doctorPage?.slug} texts={t.doctor} />
      <VideoSection clinic={clinic} texts={t.video} />
      <Testimonials list={clinic.testimonials} texts={t.testimonials} />
      {clinic.gallery && clinic.gallery.length > 0 && (
        <ClinicGallery clinic={clinic} texts={t.gallery} />
      )}
      <Contact data={clinic} texts={t.contact} />
      <FloatingCta
        scheduleLink={clinic.scheduleLink}
        label={t.floatingCta}
      />
    </div>
  );
}
