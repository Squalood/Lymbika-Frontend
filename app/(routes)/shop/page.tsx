import type { Metadata } from "next";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import { FeaturesSection } from "./components/features-section";
import HeroSection from "./components/hero-section";
import CTASection from "./components/cta-section";
import PromoCarousel from "@/components/promosection";
import PlanSection from "@/components/features/membership/plans-section";
import { getShopPage } from "@/lib/strapi/pages";
export const metadata: Metadata = {
  title: "Farmacia | Lymbika",
  description: "Encuentra medicamentos, suplementos y productos de cuidado personal. Compra en línea con entrega a domicilio.",
  alternates: { canonical: "/shop" },
};

export default async function Page() {
  const { hero, promo } = await getShopPage();
  const heroData = hero?.hero;

  return (
    <div>
      <HeroSection hero={heroData} />
      <PromoCarousel promos={promo?.promo ?? []} />
      <FeaturedProducts />
      <ChooseCategory />
      <PlanSection />
      <CTASection />
      <FeaturesSection />
    </div>
  );
}
