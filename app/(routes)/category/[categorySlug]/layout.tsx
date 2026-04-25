import type { Metadata } from "next";

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  return {
    alternates: { canonical: `https://lymbika.com/category/${categorySlug}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
