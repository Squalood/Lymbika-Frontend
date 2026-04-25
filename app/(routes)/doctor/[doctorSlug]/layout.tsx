import type { Metadata } from "next";

type Props = { params: Promise<{ doctorSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doctorSlug } = await params;
  return {
    alternates: { canonical: `https://lymbika.com/doctor/${doctorSlug}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
