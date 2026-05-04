import { ClinicType } from "@/types/clinic";
import Clinics from "./[clinicSlug]/components/clinics";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getClinics(): Promise<ClinicType[]> {
  const res = await fetch(`${BASE}/api/clinics?populate=*`, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : [];
}

export default async function Page() {
  const clinics = await getClinics();
  return <Clinics data={clinics} />;
}
