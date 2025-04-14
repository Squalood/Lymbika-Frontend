import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import { DoctorType } from "@/types/doctor";
import { SquareActivity, Stethoscope } from "lucide-react";

type ProductDoctorProps = {
    doctor: DoctorType;
};

const CardDoctor = ({ doctor }: ProductDoctorProps) => {

    return (
        <Link 
            href={`/doctor/${doctor.slug}`} 
            className="relative p-2 transition-all duration-200 rounded-lg hover:shadow-md"
        >
            {/* Servicio y cirugía del doctor */}
            <div className="absolute flex flex-col gap-1 px-2 z-[1] top-4 left-2 bg-white bg-opacity-70 p-1 rounded-md">
                {doctor.service?.serviceName && (
                    <p className="px-2 py-1 text-xs font-semibold text-gray-700 flex flex-row">
                        <Stethoscope size={16}/>{doctor.service.serviceName}
                    </p>
                )}
                {doctor.surgery?.surgeryName && (
                    <p className="px-2 py-1 text-xs font-semibold text-gray-500 flex flex-row">
                        <SquareActivity size={16}/>{doctor.surgery.surgeryName}
                    </p>
                )}
            </div>

            {/* Carrusel de imágenes */}
            <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                <CarouselContent>
                    {doctor.image?.length > 0 ? (
                        doctor.image.map((image) => (
                            <CarouselItem key={image.id} className="group">
                                <img 
                                    src={image.url || "/placeholder-image.webp"} 
                                    alt={doctor.doctorName} 
                                    className="rounded-xl w-full h-48 object-cover"
                                />
                            </CarouselItem>
                        ))
                    ) : (
                        <CarouselItem className="group">
                            <img 
                                src="/placeholder-image.webp" 
                                alt="Imagen no disponible" 
                                className="rounded-xl w-full h-48 object-cover"
                            />
                        </CarouselItem>
                    )}
                </CarouselContent>
            </Carousel>

            {/* Nombre del doctor y calificación */}
            <div className="text-center mt-2">
                <p className="text-lg font-semibold">{doctor.doctorName}</p>
                <p className="text-sm text-gray-500">⭐ {doctor.review} / 5</p>
            </div>
        </Link>
    );
};

export default CardDoctor;
