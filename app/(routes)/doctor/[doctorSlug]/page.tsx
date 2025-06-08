import { Separator } from "@/components/ui/separator";
import DoctorShow from "./components/doctor-show";
import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import DoctorReviews from "./components/doctor-reviews";

export default async function Page() {
  const user = await getUserMeLoader();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
      <DoctorShow />
      <Separator className="mt-6" />
      <DoctorReviews userData={user?.data} />
    </div>
  );
}
