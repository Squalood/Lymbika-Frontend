import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSpecialtyData } from "@/lib/strapi/medical-services";
import SpecialtyTitle from "./components/specialtyTitle";
import SpecialtyInfo from "./components/specialtyInfo";
import MedicalServicesCatalog from "./components/medicalServicesCatalog";

type Props = { params: Promise<{ specialtySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialtySlug } = await params;
  const { service } = await getSpecialtyData(specialtySlug);
  if (!service) return {};
  return {
    title: `${service.serviceName} | Lymbika`,
    description: service.description,
    alternates: { canonical: `/specialty/${specialtySlug}` },
  };
}

export default async function Page({ params }: Props) {
  const { specialtySlug } = await params;
  const { service, catalogItems } = await getSpecialtyData(specialtySlug);

  if (!service) notFound();

  return (
    <div className="w-full py-4 mx-auto sm:py-16">
      <SpecialtyTitle />
      <SpecialtyInfo service={service} />
      <MedicalServicesCatalog items={catalogItems} specialtySlug={specialtySlug} />
    </div>
  );
}
