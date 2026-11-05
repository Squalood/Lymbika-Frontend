import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import DoctorShow from "./components/doctor-show";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import DoctorReviews from "./components/doctor-reviews";
import { getDoctorBySlug, getDoctorReviews } from "@/lib/strapi/doctors";

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
  const [doctor, reviews, user] = await Promise.all([
    getDoctorBySlug(doctorSlug),
    getDoctorReviews(doctorSlug),
    getUserMeLoader(),
  ]);

  if (!doctor) notFound();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
      <DoctorShow doctor={doctor} />
      <Separator className="mt-6" />
      <DoctorReviews doctor={doctor} reviews={reviews} userData={user?.data} />
    </div>
  );
}
