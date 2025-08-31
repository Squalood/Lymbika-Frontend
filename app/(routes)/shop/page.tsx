"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import PromoCarousel from "./components/promosection";
import { FeaturesSection } from "./components/featuresSection";
import HeroSection from "./components/heroSection";
import CTASection from "./components/ctaSection";
import { useGetPromo } from "@/api/getPromo";

export default function Page() {
    const {promo} = useGetPromo();

    return(  
    <div>
        <HeroSection/>
        <FeaturesSection/>
        <FeaturedProducts />
        <PromoCarousel data={promo}/>
        <ChooseCategory />
        <CTASection/>
    </div>   
    );
}