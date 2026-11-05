import type { Metadata } from "next";
import HospitaSection from "@/components/features/hospitals/hospitals-section";

export const metadata: Metadata = {
  title: "Hospitales | Lymbika Healthcare",
  alternates: { canonical: "/hospitals" },
};

export default function Page() {
  return <HospitaSection />;
}
