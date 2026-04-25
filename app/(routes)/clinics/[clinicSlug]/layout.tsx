import type { Metadata } from "next";

type Props = { params: Promise<{ clinicSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clinicSlug } = await params;
  return {
    alternates: { canonical: `https://lymbika.com/clinics/${clinicSlug}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
