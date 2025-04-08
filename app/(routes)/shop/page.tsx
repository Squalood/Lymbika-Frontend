"use client";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
    return(  
        <div>
            <FeaturedProducts />
            <div className="flex justify-center">
                <div className="flex flex-col sm:flex-row justify-evenly gap-2 p-4">
                    <div className="w-9/12 sm:w-1/2 flex justify-center mx-auto">
                        <Image
                            src="/promos/mediClub-promo.jpg"
                            alt="membership image"
                            width={690}
                            height={690}
                            className="max-w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="sm:w-1/2 text-center sm:text-left flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold mx-auto text-green-500">MediClub</h2>
                        <Button className="mt-4 w-1/4 mx-auto">Mas Info</Button>
                    </div>
                </div>
            </div>
            <ChooseCategory />
        </div>   
    );
}
