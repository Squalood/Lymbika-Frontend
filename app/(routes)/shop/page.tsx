"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import { FeaturesSection } from "./components/featuresSection";
import HeroSection from "./components/heroSection";
import CTASection from "./components/ctaSection";
import { useGetPromo } from "@/api/getPromo";
import PromoCarousel from "@/components/promosection";

export default function Page() {
    const {promo} = useGetPromo("farmacia");

    return(  
    <div>
        <HeroSection/>
        <FeaturesSection/>
        <FeaturedProducts />
        {promo && promo.length > 0 && (
            <PromoCarousel data={promo} />
        )}
        <ChooseCategory />
        <CTASection/>
    </div>   
    );
}