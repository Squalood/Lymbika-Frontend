"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeleton/skeletonSchema";
import { ProductType } from "@/types/product";
import ProductCard from "./productCard";

const FeaturedProducts = () => {
    const { loading, result }: ResponseType = useGetFeaturedProducts();

    return ( 
        <div className="max-w-6xl py-4 mx-auto sm:py-8 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8">Productos del mes</h3>
            <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4 mt-4 md:mt-0">
                    {loading && <SkeletonSchema grid={3} />}
                    {result?.map((product: ProductType) => {
                        const { id } = product;

                        return (
                            <CarouselItem key={id} className="basis-1/2 lg:basis-1/3 group">
                                <div className="p-1">
                                    <ProductCard key={product.id} product={product}/>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex"/>
                <CarouselNext className="hidden sm:flex"/>
            </Carousel>
        </div>
    );
};

export default FeaturedProducts;
