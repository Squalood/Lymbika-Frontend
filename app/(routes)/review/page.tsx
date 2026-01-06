import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import ReviewPageClient from "./components/review-page-client";

export default async function ReviewPage() {
  const user = await getUserMeLoader();
  const userId = user?.data?.id;

  return <ReviewPageClient userId={userId} />;
}
