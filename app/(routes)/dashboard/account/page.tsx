import { getUserMeLoader } from "@/app/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/profile-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;

  return (
    <div className="flex flex-col sm:w-full md:w-3/5 lg:w-2/5 mx-auto px-6">
      <div className="mb-4 w-full">
          <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Volver
              </Link>
          </Button>
      </div>
      <h1>Editar Cuenta</h1>
      <div className="mt-8">
        {userData ? (
          <ProfileForm data={userData} />
        ) : (
          <p role="alert" className="rounded-md border border-pink-300 bg-pink-50 px-4 py-3 text-sm text-pink-700">
            No pudimos cargar tu perfil. Vuelve a iniciar sesión e inténtalo de nuevo.
          </p>
        )}
      </div>
    </div>
  );
}