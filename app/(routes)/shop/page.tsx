"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import PromoCarousel from "./components/promosection";
import { FeaturesSection } from "./components/featuresSection";
import HeroSection from "./components/heroSection";
import CTASection from "./components/ctaSection";

export default function Page() {
    return(  
    <div>
        <HeroSection/>
        <FeaturesSection/>
        <FeaturedProducts />
        <PromoCarousel/>
        <ChooseCategory />
        <CTASection/>
    </div>   
    );
}