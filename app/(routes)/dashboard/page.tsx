import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { LoggedInUser } from "@/components/custom/UserLogin";
import { LogoutButton } from "@/components/forms/logout-button";

export default async function DashboardLayout() {
  const user = await getUserMeLoader();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1>Dashboard</h1>
      <LoggedInUser userData={user.data} />
      <LogoutButton />
    </div>
  );
}
