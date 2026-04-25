import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://lymbika.com/specialty" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
