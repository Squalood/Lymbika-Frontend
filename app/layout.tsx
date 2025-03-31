import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
//import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader'
import { getUserMeLoader } from "./data/services/get-user-me-loader";

const urbanist = Urbanist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Lymbika Healthcare",
  description: "Agencia de salud",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUserMeLoader();

  return (
    <html lang="en">
      <body className={urbanist.className}>
          <NextTopLoader/>
          <Navbar user={userData.ok ? userData.data : null} />
          {children}
          <Toaster richColors/>
          <Footer />
      </body>
    </html>
  );
}