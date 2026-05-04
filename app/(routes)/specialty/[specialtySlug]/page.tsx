import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceType } from "@/types/service";
import { MedicalServiceType } from "@/types/medicalService";
import SpecialtyTitle from "./components/specialtyTitle";
import SpecialtyInfo from "./components/specialtyInfo";
import MedicalServicesCatalog, { MedicalServiceCatalogItem } from "./components/medicalServicesCatalog";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getSpecialtyData(slug: string): Promise<{
  service: ServiceType | null;
  catalogItems: MedicalServiceCatalogItem[];
}> {
  const [servicesRes, ratesRes] = await Promise.all([
    fetch(`${BASE}/api/services?populate=*`, { next: { revalidate: 3600 } }),
    fetch(
      `${BASE}/api/service-rates?populate[medical_service][fields][0]=name&populate[medical_service][fields][1]=slug&populate[medical_service][fields][2]=type&populate[medical_service][fields][3]=description&populate[medical_service][populate][image][fields][0]=url&populate[medical_service][populate][specialty][fields][0]=slug&pagination[pageSize]=100`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  const [servicesJson, ratesJson] = await Promise.all([
    servicesRes.json(),
    ratesRes.json(),
  ]);

  const services: ServiceType[] = Array.isArray(servicesJson.data) ? servicesJson.data : [];
  const service = services.find((s) => s.slug === slug) ?? null;

  const rates = Array.isArray(ratesJson.data) ? ratesJson.data : [];
  const map = new Map<string, MedicalServiceCatalogItem>();
  for (const rate of rates) {
    const ms: MedicalServiceType = rate.medical_service;
    if (!ms?.slug || ms.specialty?.slug !== slug) continue;
    const existing = map.get(ms.slug);
    if (!existing) {
      map.set(ms.slug, { service: ms, minPrice: rate.price });
    } else if (rate.price < existing.minPrice) {
      existing.minPrice = rate.price;
    }
  }

  return { service, catalogItems: Array.from(map.values()) };
}

type Props = { params: Promise<{ specialtySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialtySlug } = await params;
  const { service } = await getSpecialtyData(specialtySlug);
  if (!service) return {};
  return {
    title: `${service.serviceName} | Lymbika`,
    description: service.description,
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
