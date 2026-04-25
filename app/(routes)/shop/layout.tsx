import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://lymbika.com/shop" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
