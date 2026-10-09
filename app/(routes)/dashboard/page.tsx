import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { verificarAcceso } from "@/app/data/services/case-admin-service";
import Navs from "./components/navs";

export default async function DashboardLayout() {
  // Strapi decide quién opera casos: los roles con permiso para leerlos.
  const [user, acceso] = await Promise.all([getUserMeLoader(), verificarAcceso()]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Navs userData={user.data} puedeOperar={acceso === "ok"} />
    </div>
  );
}
