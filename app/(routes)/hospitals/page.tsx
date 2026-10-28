import type { Metadata } from "next";
import HospitaSection from "./components/hospitalsSection";

export const metadata: Metadata = {
  title: "Hospitales | Lymbika Healthcare",
  alternates: { canonical: "/hospitals" },
};

export default function Page() {
  return <HospitaSection />;
}
