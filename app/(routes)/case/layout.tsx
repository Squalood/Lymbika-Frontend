import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coordinar mi caso | Lymbika",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
