import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { catalogosDelCaso, doctorAsignado } from "@/app/data/services/case-admin-service";
import { NuevoCasoForm } from "../components/nuevo-caso-form";

export default async function NuevoCasoPage() {
  const [{ procedimientos }, doctor] = await Promise.all([
    catalogosDelCaso(),
    doctorAsignado(),
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href="/dashboard/operations"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Bandeja
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Nuevo caso</h1>
        <p className="text-sm text-muted-foreground">
          Para pacientes que llegaron por WhatsApp o teléfono. El número de caso y el enlace de
          Mi caso se generan solos.
          {doctor && " El caso queda asignado a ti."}
        </p>
      </div>
      <NuevoCasoForm procedimientos={procedimientos} />
    </div>
  );
}
