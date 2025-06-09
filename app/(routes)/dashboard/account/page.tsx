import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/profile-form";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;

  return (
    <div className="flex flex-col sm:w-full md:w-3/5 lg:w-2/5 mx-auto px-6">
      <h1>Editar Cuenta</h1>
      <div className="mt-8">
        <ProfileForm data={userData}/>
      </div>
    </div>
  );
}