import type { Metadata } from "next";
import Catalog from "./components/catalog";

export const metadata: Metadata = {
  title: "Doctores | Lymbika Healthcare",
  description:
    "Encuentra doctores por especialidad, consulta su perfil y agenda tu cita con Lymbika.",
  alternates: { canonical: "/doctor-catalog" },
};

export default function Page() {
  return (
    <div>
      <Catalog />
    </div>
  );
}
