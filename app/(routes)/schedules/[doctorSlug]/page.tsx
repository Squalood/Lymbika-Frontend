import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchedulesPage } from "@/lib/strapi/pages";
import { elegirDoctor, resolverContenido } from "../config";
import { SchedulesView, metadataDe } from "../SchedulesView";

type Props = { params: Promise<{ doctorSlug: string }> };

/**
 * Pre-renderiza los doctores ligados hoy al single type; los que se liguen
 * después se generan en la primera visita. Si Strapi falla, page es null y
 * no se pre-renderiza ninguno (el build no se rompe).
 */
export async function generateStaticParams() {
  const page = await getSchedulesPage();
  return (page?.doctors ?? []).filter((doc) => doc.slug).map((doc) => ({ doctorSlug: doc.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doctorSlug } = await params;
  const page = await getSchedulesPage();
  const doctor = elegirDoctor(page, doctorSlug);
  if (page && !doctor) return {};
  return metadataDe(page, resolverContenido(page, doctor), !!doctor);
}

export default async function SchedulesDoctorPage({ params }: Props) {
  const { doctorSlug } = await params;
  const page = await getSchedulesPage();
  const doctor = elegirDoctor(page, doctorSlug);
  // Sin respuesta de Strapi no se puede saber si el slug existe: sale con los
  // defaults, como /schedules, en lugar de un 404 que tumbaría links compartidos.
  if (page && !doctor) notFound();
  return <SchedulesView content={resolverContenido(page, doctor)} />;
}
