import GalleryModal from "@/components/galleryModal";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import TiktokEmbed from "@/components/TiktokEmbed";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProductType } from "@/types/product";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type ProductProps = {
  product: ProductType;
};

// Función para detectar la plataforma del video basándose en el formato del ID
const detectVideoPlatform = (videoId: string): "youtube" | "tiktok" => {
  // TikTok IDs son números largos (típicamente 19 dígitos)
  // YouTube IDs son alfanuméricos cortos (típicamente 11 caracteres)
  return /^\d{15,}$/.test(videoId) ? "tiktok" : "youtube";
};

const CarouselProduct = ({ product }: ProductProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const hasImages = product.images || [];
    const hasVideos = product.videos || [];

    const hasContent = hasImages.length > 0 || hasVideos.length > 0;

    return (
        <>
        <div className="p-8">
            <Carousel>
                <CarouselContent>
                    {hasContent ? (
                        <>
                            {/* Renderizar imágenes */}
                            {hasImages.map((image, index) => (
                                <CarouselItem key={`image-${image.id}`} className="flex items-center justify-center">
                                    <button
                                        className="group block overflow-hidden rounded-lg relative w-full"
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        <Image
                                            src={image.url}
                                            alt="Gallery image"
                                            width={1200}
                                            height={800}
                                            className="object-contain rounded-lg w-full h-auto max-h-[600px]"
                                        />
                                        <div className="absolute bottom-1 end-1 opacity-0 group-hover:opacity-100 transition">
                                            <div className="flex items-center gap-x-1 py-1 px-2 bg-white border border-gray-200 text-gray-800 rounded-lg">
                                                <Search size={12} strokeWidth={2} />
                                                <span className="text-xs">View</span>
                                            </div>
                                        </div>
                                    </button>
                                </CarouselItem>
                            ))}

                            {/* Renderizar videos */}
                            {hasVideos.map((video) => {
                                const platform = detectVideoPlatform(video.videoID);

                                return (
                                    <CarouselItem key={`video-${video.id}`}>
                                        <div className="rounded-lg">
                                            {platform === "youtube" ? (
                                                <YoutubeEmbed
                                                    videoId={video.videoID}
                                                    orientation="vertical"
                                                />
                                            ) : (
                                                <TiktokEmbed
                                                    videoId={video.videoID}
                                                    orientation="vertical"
                                                />
                                            )}
                                        </div>
                                    </CarouselItem>
                                );
                            })}
                        </>
                    ) : (
                        // Si no hay imágenes ni videos, muestra un placeholder
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
                <CarouselPrevious className="left-2 md:left-4" />
                <CarouselNext className="right-2 md:right-4" />
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
