"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import HeroWide from "./components/heroWide";

export default function Page() {
    return(  
        <div>
            <HeroWide/>
            <FeaturedProducts />
            <ChooseCategory />
        </div>   
    );
}
