import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/profile-form";

export default async function AccountRoute() {
    const user = await getUserMeLoader();
    const userData = user.data;
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
        <ProfileForm data={userData} className="col-span-3" />
      </div>
    );
  }