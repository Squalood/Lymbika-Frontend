"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import { FeaturesSection } from "./components/featuresSection";
import HeroSection from "./components/heroSection";
import CTASection from "./components/ctaSection";
import { useGetPromo } from "@/api/getPromo";
import PromoCarousel from "@/components/promosection";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import HeroSkeleton from "@/components/skeleton/heroSkeleton";
import PlanSection from "../membership/components/plansSection";

export default function Page() {
    const {promo} = useGetPromo("farmacia");
    const { hero, loading } = useGetPageHero("farmacia");

    const heroData = hero[0]?.hero;

    return(  
    <div>
        {loading ? <HeroSkeleton /> : <HeroSection hero={heroData}/>}
        <PromoCarousel data={promo} />
        <FeaturedProducts />
        <ChooseCategory />
        <PlanSection/>
        <CTASection/>
        <FeaturesSection/>
    </div>   
    );
}