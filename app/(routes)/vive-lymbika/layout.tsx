import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vive Lymbika | Lymbika Healthcare",
  description:
    "Recorre paso a paso cómo acompañamos a cada paciente: consulta médica, estudios, medicamentos o cirugía, coordinado por nosotros desde WhatsApp.",
  alternates: { canonical: "https://lymbika.com/vive-lymbika" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
