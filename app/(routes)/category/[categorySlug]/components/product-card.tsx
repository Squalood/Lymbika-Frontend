import IconButtom from "@/components/icon-button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductCardProps = {
    product:ProductType
}

const ProductCard = (props: ProductCardProps) => {
    const {product} = props
    const router = useRouter()

    return ( 
        <Link href={`/product/${product.slug}`}
        className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md">
            <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
                <p className="px-2 py-1 text-xs">{product.category.categoryName}</p>
            </div>
            <Carousel opts={{align: "start"}}className="w-full max-w-sm">
            <CarouselContent>
                    {product.images && product.images.length > 0 ? (
                        product.images.map((image) => (
                            <CarouselItem key={image.id} className="group">
                                <img 
                                    src={image.url || "https://dummyimage.com/250x250/999799/ebebeb.jpg&text"} 
                                    alt={product.productName} 
                                    className="rounded-xl"
                                />
                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                    <div className="flex justify-center gap-x-6">
                                        <IconButtom 
                                            onClick={() => router.push(`/product/${product.slug}`)}
                                            icon={<Expand size={20} className="text-gray-600" />}
                                        />
                                        <IconButtom 
                                            onClick={() => console.log("product")}
                                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        // Si no hay imágenes, mostrar una imagen de placeholder
                        <CarouselItem className="group">
                            <img 
                                src="https://dummyimage.com/250x250/999799/ebebeb.jpg&text" 
                                alt="Imagen no disponible" 
                                className="rounded-xl"
                            />
                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                <div className="flex justify-center gap-x-6">
                                    <IconButtom 
                                        onClick={() => router.push(`/product/${product.slug}`)}
                                        icon={<Expand size={20} className="text-gray-600" />}
                                    />
                                    <IconButtom 
                                        onClick={() => console.log("product")}
                                        icon={<ShoppingCart size={20} className="text-gray-600" />}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
            </Carousel>
            <p className="text-2xl text-center">{product.productName}</p>
            <p className="font-bold text-center">{formatPrice (product.price)}</p>
        </Link>
     );
}
 
export default ProductCard;