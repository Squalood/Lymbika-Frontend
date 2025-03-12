"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { ResponseType } from "@/types/response";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import IconButtom from "./icon-button";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

const FeaturedProducts = () => {
    const { loading, result }: ResponseType = useGetFeaturedProducts();
    const router =useRouter()
    const {addItem} = useCart()

    return ( 
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>

            <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {loading && <SkeletonSchema grid={3} />}
                    {result?.map((product: ProductType) => {
                        const { id, images, productName, slug, category } = product;

                        // Obtener la primera imagen si existe, de lo contrario, usar un placeholder
                        const imageUrl = images?.length > 0 ? images[0].url : "/placeholder-image.webp";

                        return (
                            <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                                <div className="p-1">
                                    <Card className="h-[350px] py-4 border-gray-200 shadow-none">
                                        <CardContent className="relative flex flex-col items-center justify-center px-6 py-2">
                                            <Image 
                                                src={imageUrl} 
                                                alt="Sin Imagen" 
                                                width={200} 
                                                height={200} 
                                                className="w-[200px] h-[200px] object-cover rounded-md"
                                                />
                                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                                <div className="flex justify-center gap-x-6">
                                                    <IconButtom onClick={() => router.push(`product/${slug}`)}
                                                    icon={<Expand size={20} />}
                                                    className="text-gray-600"
                                                    />
                                                    <IconButtom onClick={() => addItem(product)}
                                                    icon={<ShoppingCart size={20} />}
                                                    className="text-gray-600"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <div className="flex justify-between gap-4 px-8">
                                            <h3 className="text-lg font-bold">{productName}</h3>
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="px-2 py-1 text-white primary bg-sky-600 rounded-full w-fit">{category?.categoryName ?? "Sin categoría"}</p>
                                            </div>
                                        </div>
                                    </Card>
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
