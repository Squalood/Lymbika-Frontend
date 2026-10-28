import type { Metadata } from "next";
import ViveLymbikaExperience from "./components/vive-lymbika-experience";

export const metadata: Metadata = {
  title: "Vive Lymbika | Lymbika Healthcare",
  description:
    "Cuéntanos qué está pasando y te ayudamos a entender qué sigue: consulta, estudios, especialista, medicamentos, segunda opinión o cirugía, coordinado por Lymbika.",
  alternates: { canonical: "/vive-lymbika" },
};

export default function Page() {
  return <ViveLymbikaExperience />;
}
