import { CaseIntakeWizard } from "./components/case-intake-wizard";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function getMedicalServiceName(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-services?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&fields[0]=name&fields[1]=slug`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const servicio = json?.data?.[0];
    return servicio ? { name: String(servicio.name).trim(), slug: servicio.slug } : null;
  } catch {
    return null;
  }
}

export default async function CaseStartPage({ searchParams }: Props) {
  const params = await searchParams;

  const slug = typeof params.servicio === "string" ? params.servicio : null;
  const medicalService = slug ? await getMedicalServiceName(slug) : null;

  const utm: Record<string, string> = {};
  for (const [clave, valor] of Object.entries(params)) {
    if (clave.startsWith("utm_") && typeof valor === "string") utm[clave] = valor;
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        <CaseIntakeWizard medicalService={medicalService} utm={utm} />
      </div>
    </main>
  );
}
