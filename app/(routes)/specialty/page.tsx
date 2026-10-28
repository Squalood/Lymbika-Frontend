import type { Metadata } from "next";
import Specialties from "./components/specialties";

export const metadata: Metadata = {
  title: "Especialidades médicas | Lymbika Healthcare",
  description:
    "Consultas, estudios y procedimientos por especialidad, con doctores y clínicas de la red Lymbika.",
  alternates: { canonical: "/specialty" },
};

export default function Page() {
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 md:px-12 lg:px-0">
      <Specialties />
    </div>
  );
}
