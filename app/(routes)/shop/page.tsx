"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import HeroWide from "./components/heroWide";
import PromoCarousel from "./components/promosection";

export default function Page() {
    return(  
        <div>
            <HeroWide/>
            <FeaturedProducts />
            <PromoCarousel/>
            <ChooseCategory />
        </div>   
    );
}
