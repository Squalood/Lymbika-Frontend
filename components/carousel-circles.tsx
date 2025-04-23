import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

import Link from "next/link";
import SkeletonSchema from "./skeleton/skeletonSchema";
import { Card } from "./ui/card";
import Image from "next/image";

interface CarouselItemType {
    id: string;
    cate: string;
    name: string;
    imageUrl?: string;
    slug: string;
}

interface CarouselComponentProps {
    items: CarouselItemType[];
    loading: boolean;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ items, loading }) => {
    return ( 
        <Carousel>
            <CarouselContent className="-ml-2 sm:-ml-4">
                {loading && <SkeletonSchema grid={3} />}
                {items.map((item) => (
                    <CarouselItem key={item.id} className="basis-52 lg:basis-1/3 group">
                        <div className="flex justify-center p-4">
                            <Link href={`/${item.cate}/${item.slug}`} className="relative w-40 h-40 sm:w-60 sm:h-60">
                                <Card className="relative w-full h-full overflow-hidden rounded-full shadow-lg border-none transition duration-300 ease-in-out hover:scale-110">
                                    {/* Imagen */}
                                    {item.imageUrl && (
                                        <Image 
                                            src={item.imageUrl} 
                                            alt={item.name} 
                                            layout="fill" 
                                            objectFit="cover" 
                                            className="absolute inset-0 rounded-full"
                                        />
                                    )}
                                    {/* Texto */}
                                    <div className="absolute inset-0 flex items-end justify-center mb-10">
                                        <span className="text-white text-lg font-bold text-center bg-black/60 px-3 py-1 rounded-lg">
                                            {item.name}
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
        </Carousel>
     );
}
 
export default CarouselComponent;