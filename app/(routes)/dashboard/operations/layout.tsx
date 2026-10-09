import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { verificarAcceso } from "@/app/data/services/case-admin-service";

export const metadata: Metadata = {
  title: "Operación | Lymbika",
  robots: { index: false, follow: false },
};

/**
 * Admin de coordinación. El proxy ya exige sesión; aquí se confirma con
 * Strapi que el rol del usuario tenga permiso sobre `case`.
 */
export default async function OperacionLayout({ children }: { children: React.ReactNode }) {
  const acceso = await verificarAcceso();

  if (acceso === "sin-sesion") redirect("/signin?callbackUrl=/dashboard/operations");

  if (acceso === "sin-permiso") {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="h-10 w-10 text-muted-foreground" />
        <h1 className="text-2xl font-bold">No tienes acceso a Operación</h1>
        <p className="text-muted-foreground">
          Esta sección es solo para el equipo de Lymbika. Si deberías tener acceso, pide que
          le den a tu usuario un rol con permiso para ver casos.
        </p>
        <Link href="/" className="text-primary underline underline-offset-4">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/dashboard/operations" className="font-semibold">
            Operación <span className="font-normal text-muted-foreground">· Casos</span>
          </Link>
          <Link
            href="/dashboard/operations/new"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            + Nuevo caso
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </div>
  );
}
