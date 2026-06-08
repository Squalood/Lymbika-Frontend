import type { Metadata } from "next";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import { FeaturesSection } from "./components/featuresSection";
import HeroSection from "./components/heroSection";
import CTASection from "./components/ctaSection";
import PromoCarousel from "@/components/promosection";
import PlanSection from "../membership/components/plansSection";
import { PageType } from "@/types/pages";

export const metadata: Metadata = {
  title: "Farmacia | Lymbika",
  description: "Encuentra medicamentos, suplementos y productos de cuidado personal. Compra en línea con entrega a domicilio.",
  alternates: {
    canonical: "https://lymbika.com/shop",
  },
};

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getShopPage(): Promise<{ hero: PageType | null; promo: PageType | null }> {
  const [heroRes, promoRes] = await Promise.all([
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=farmacia&populate[hero][populate]=image&populate[promo][populate]=image&populate[plan][populate]=plus&populate[plan][populate]=less`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=farmacia&populate[promo][populate]=*`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  const [heroJson, promoJson] = await Promise.all([heroRes.json(), promoRes.json()]);

  return {
    hero: heroJson.data?.[0] ?? null,
    promo: promoJson.data?.[0] ?? null,
  };
}

export default async function Page() {
  const { hero, promo } = await getShopPage();
  const heroData = hero?.hero;
  const promoData = promo ? [promo] : [];

  return (
    <div>
      <HeroSection hero={heroData} />
      <PromoCarousel data={promoData} />
      <FeaturedProducts />
      <ChooseCategory />
      <PlanSection />
      <CTASection />
      <FeaturesSection />
    </div>
  );
}
