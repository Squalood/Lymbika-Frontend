"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import Image from "next/image";

export default function Page() {
    return(  
        <div>
            <FeaturedProducts />
            <ChooseCategory />
            <div className="flex flex-wrap justify-evenly gap-2 p-4">
                {["/promos/Promo-1.jpg", "/promos/Promo-2.jpg", "/promos/Promo-3.jpg"].map((src, i) => (
                    <div key={i} className="w-[300px] overflow-hidden rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-110">
                    <Image 
                        src={src}
                        alt={`Promo ${i + 1}`}
                        width={720}
                        height={1280}
                        className="w-full h-full object-cover"
                    />
                    </div>
                ))}
            </div>
        </div>   
    );
}
