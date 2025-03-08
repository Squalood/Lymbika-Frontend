import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
//import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader'

const urbanist = Urbanist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Lymbika E-commerce",
  description: "Agencia de salud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
          <NextTopLoader/>
          <Navbar/>
          {children}
          <Toaster richColors/>
          <Footer />
      </body>
    </html>
  );
}