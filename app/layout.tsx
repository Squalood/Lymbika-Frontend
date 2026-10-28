import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionErrorBanner } from "@/components/auth/session-error-banner";
import WhatsAppButton from "@/components/whatsapp-button";
import Footer from "@/components/footer";
//import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import NextTopLoader from 'nextjs-toploader'
import { getUserMeLoader } from "./data/services/get-user-me-loader";
import Script from "next/script";
import Image from "next/image";
import { NavbarSectionType } from "@/types/single-types/navbar";
import { GA_TRACKING_ID } from "@/lib/gtag";
import { getSiteConfig } from "@/api/getSiteConfig";
import { SiteConfigProvider } from "@/components/site-config-provider";
import { SITE_URL } from "@/lib/seo";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getNavbarContent(): Promise<NavbarSectionType | undefined> {
  try {
    const res = await fetch(
      `${BASE}/api/navbar-section?populate=about_brand_image`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return undefined;
    const json = await res.json();
    return json.data ?? undefined;
  } catch {
    return undefined;
  }
}

const urbanist = Urbanist({ subsets: ["latin"], display: "swap" });

// Valores por defecto para todo el sitio. Cada page.tsx pone su propio
// título, descripción y canónica relativa ("/shop"); `metadataBase` la
// completa con el dominio. Las canónicas no van en layouts: las heredan
// todas las rutas hijas y Google las toma como copias de la página padre.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lymbika Healthcare",
  description:
    "Farmacia en línea, doctores, clínicas, cirugías y membresía de salud con Lymbika Healthcare.",
  openGraph: {
    siteName: "Lymbika Healthcare",
    locale: "es_MX",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const [userData, navContent, siteConfig] = await Promise.all([
    getUserMeLoader(),
    getNavbarContent(),
    getSiteConfig(),
  ]);

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body className={urbanist.className}>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>

        {/* Facebook Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1341384531034676');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1341384531034676&ev=PageView&noscript=1"
            alt="Facebook Pixel"
            unoptimized
          />
        </noscript>

        <SiteConfigProvider config={siteConfig}>
          <NextTopLoader/>
          <SessionErrorBanner error={userData.error} />
          <Navbar user={userData.ok ? userData.data : null} navContent={navContent} />
            {children}
          <Toaster richColors/>
          <Footer />

          <WhatsAppButton />
        </SiteConfigProvider>
      </body>
    </html>
  );
}