import type { Metadata } from "next";
import { getClinics } from "@/lib/strapi/clinics";
import Clinics from "@/components/features/clinics/clinics-list";

export const metadata: Metadata = {
  title: "Clínicas | Lymbika Healthcare",
  alternates: { canonical: "/clinics" },
};

export default async function Page() {
  const clinics = await getClinics();
  return <Clinics data={clinics} />;
}
