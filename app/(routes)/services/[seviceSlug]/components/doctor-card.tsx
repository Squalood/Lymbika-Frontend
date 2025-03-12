import IconButtom from "@/components/icon-button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { DoctorType } from "@/types/doctor";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductDoctorProps = {
    doctor:DoctorType
}

const CardDoctor = (props: ProductDoctorProps) => {
    const {doctor} = props
    const router = useRouter()

    return ( 
        <Link href={`/product/${doctor.slug}`}
        className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md">
            <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
                <p className="px-2 py-1 text-xs">{doctor.service.serviceName}</p>
            </div>
            <Carousel opts={{align: "start"}}className="w-full max-w-sm">
            <CarouselContent>
                    {doctor.image && doctor.image.length > 0 ? (
                        doctor.image.map((image) => (
                            <CarouselItem key={image.id} className="group">
                                <img 
                                    src={image.url || "/placeholder-image.webp"} 
                                    alt={doctor.doctorName} 
                                    className="rounded-xl"
                                />
                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                    <div className="flex justify-center gap-x-6">
                                        <IconButtom 
                                            onClick={() => router.push(`/doctor/${doctor.slug}`)}
                                            icon={<Expand size={20} className="text-gray-600" />}
                                        />
                                        <IconButtom 
                                            onClick={() => console.log("doctor")}
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
                                src="/placeholder-image.webp" 
                                alt="Imagen no disponible" 
                                className="rounded-xl"
                            />
                            <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                <div className="flex justify-center gap-x-6">
                                    <IconButtom 
                                        onClick={() => router.push(`/doctor/${doctor.slug}`)}
                                        icon={<Expand size={20} className="text-gray-600" />}
                                    />
                                    <IconButtom 
                                        onClick={() => console.log("doctor")}
                                        icon={<ShoppingCart size={20} className="text-gray-600" />}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    )}
                </CarouselContent>
            </Carousel>
            <p className="text-2xl text-center">{doctor.doctorName}</p>
        </Link>
     );
}
 
export default CardDoctor;