import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

interface CarouselProductProps {
    images?: {
        id: number;
        url: string | null;
    }[];
}

const CarouselProduct = ({ images }: CarouselProductProps) => {
    const hasImages = images && images.length > 0;

    return (  
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {hasImages ? (
                        images.map((image) => (
                            <CarouselItem key={image.id}>
                                <img 
                                    src={image.url || "https://dummyimage.com/250x250/999799/ebebeb.jpg&text"} 
                                    alt="Imagen del producto" 
                                    className="rounded-lg"
                                />
                            </CarouselItem>
                        ))
                    ) : (
                        // Si no hay imágenes, muestra un placeholder
                        <CarouselItem>
                            <img 
                                src="https://dummyimage.com/250x250/999799/ebebeb.jpg&text" 
                                alt="Imagen no disponible" 
                                className="rounded-lg"
                            />
                        </CarouselItem>
                    )}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    );
};

export default CarouselProduct;
