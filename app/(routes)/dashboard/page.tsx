import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import Navs from "./components/navs";

export default async function DashboardLayout() {
  const user = await getUserMeLoader();

  return (
    <div className="flex flex-col w-full h-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Navs userData={user.data}/>
    </div>
  );
}
