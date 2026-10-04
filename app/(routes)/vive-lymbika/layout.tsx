import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vive Lymbika | Lymbika Healthcare",
  description:
    "Cuéntanos qué está pasando y te ayudamos a entender qué sigue: consulta, estudios, especialista, medicamentos, segunda opinión o cirugía, coordinado por Lymbika.",
  alternates: { canonical: "https://lymbika.com/vive-lymbika" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
