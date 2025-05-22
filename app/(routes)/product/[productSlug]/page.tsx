"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import CarouselProductSkeleton from "./components/carouselProductSkeleton";

export default function Page (){
    const params = useParams()
    const {productSlug} = params;
    const { result }: ResponseType = useGetProductBySlug(productSlug ?? '')

    if (result == null){
        return(
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                <div className="grid sm:grid-cols-2">
                    <div>
                        <CarouselProductSkeleton/>
                    </div>
                    <div className="pt-8 sm:pt-0 sm:px-12">
                        <SkeletonProduct/>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <div className="grid sm:grid-cols-2">
                <div>
                    <CarouselProduct product={result[0]}/>
                </div>

                <div className="sm:px-12">
                    <InfoProduct product={result[0]}/>
                </div>
            </div>
        </div>
    )
}
