import GalleryModal from "@/components/galleryModal";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProductType } from "@/types/product";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type ProductProps = {
  product: ProductType;
};

const CarouselProduct = ({ product }: ProductProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const hasImages = product.images || [];

    return (  
        <>
        <div className="p-8">
            <Carousel>
                <CarouselContent>
                    {hasImages.length > 0 ? (
                        hasImages.map((image, index) => (
                            <CarouselItem key={image.id}>
                                <button
                                    key={image.id || index}
                                    className="group block overflow-hidden rounded-lg"
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <Image
                                        src={image.url}
                                        alt="Gallery image"
                                        width={1200}
                                        height={800}
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-1 end-1 opacity-0 group-hover:opacity-100 transition">
                                    <div className="flex items-center gap-x-1 py-1 px-2 bg-white border border-gray-200 text-gray-800 rounded-lg">
                                        <Search size={12} strokeWidth={2} />
                                        <span className="text-xs">View</span>
                                    </div>
                                    </div>
                                </button>
                            </CarouselItem>
                        ))
                    ) : (
                        // Si no hay imágenes, muestra un placeholder
                        <CarouselItem>
                            <Image 
                                src="/placeholder-image.webp" 
                                alt="Imagen no disponible"
                                width={800}
                                height={800}
                                className="rounded-lg"
                            />
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
        {selectedIndex !== null && (
            <GalleryModal
            images={hasImages}
            startIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            />
        )}
        </>
    );
};

export default CarouselProduct;
