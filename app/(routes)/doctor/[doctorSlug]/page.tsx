import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import DoctorShow from "./components/doctor-show";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import DoctorReviews from "./components/doctor-reviews";
import { getDoctorBySlug, getDoctorReviews } from "@/lib/strapi/doctors";
import { getSchedulesPage } from "@/lib/strapi/pages";

type Props = { params: Promise<{ doctorSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doctorSlug } = await params;
  const doctor = await getDoctorBySlug(doctorSlug);
  if (!doctor) return {};
  return {
    title: `${doctor.doctorName} | Lymbika`,
    description: doctor.about,
    alternates: { canonical: `/doctor/${doctorSlug}` },
  };
}

export default async function Page({ params }: Props) {
  const { doctorSlug } = await params;
  const [doctor, reviews, user, schedules] = await Promise.all([
    getDoctorBySlug(doctorSlug),
    getDoctorReviews(doctorSlug),
    getUserMeLoader(),
    getSchedulesPage(),
  ]);

  if (!doctor) notFound();

  // Si consulta en la sucursal (ligado en schedules-page), "Solicitar cita"
  // lleva a su variante de la landing en lugar del calendario/WhatsApp propio.
  const agendaHref = schedules?.doctors?.some((d) => d.slug === doctorSlug)
    ? `/schedules/${encodeURIComponent(doctorSlug)}`
    : undefined;

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
      <DoctorShow doctor={doctor} agendaHref={agendaHref} />
      <Separator className="mt-6" />
      <DoctorReviews doctor={doctor} reviews={reviews} userData={user?.data} />
    </div>
  );
}
