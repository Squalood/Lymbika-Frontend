import { Separator } from "@/components/ui/separator";
import DoctorShow from "./components/doctor-show";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import DoctorReviews from "./components/doctor-reviews";
import { getDoctorBySlug } from "@/api/getDoctorBySlugServer";
import { getDoctorReviews } from "@/api/getDoctorReviewsServer";

type PageProps = {
  params: {
    doctorSlug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const doctorSlug = params.doctorSlug

  const doctorData = await getDoctorBySlug(doctorSlug);
  const doctor = doctorData?.[0] ?? null;

  const reviews = await getDoctorReviews(doctorSlug);
  const user = await getUserMeLoader();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
      <DoctorShow doctorSlug={doctorSlug} />
      <Separator className="mt-6" />
      <DoctorReviews reviews={reviews} doctor={doctor} userData={user?.data} />
    </div>
  );
}
