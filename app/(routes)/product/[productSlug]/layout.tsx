import type { Metadata } from "next";

type Props = { params: Promise<{ productSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  return {
    alternates: { canonical: `https://lymbika.com/product/${productSlug}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
