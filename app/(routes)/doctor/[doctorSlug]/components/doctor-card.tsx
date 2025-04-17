import Link from "next/link";
import Image from "next/image";
import { DoctorType } from "@/types/doctor";
import { CalendarCheck, SquareActivity, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";


type ProductDoctorProps = {
    doctor: DoctorType;
};

const CardDoctor = ({ doctor }: ProductDoctorProps) => {

const imageUrl =
doctor.image && doctor.image.length > 0
    ? doctor.image[0].url
    : "/placeholder-image.webp";

    return (
        <Link 
            href={`/doctor/${doctor.slug}`} 
            className="relative p-2 transition-all duration-200 rounded-lg hover:shadow-md"
        >
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex items-start gap-4 p-6">
                {/* Imagen del doctor */}
                <Image
                    src={imageUrl}
                    alt={doctor.doctorName}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full object-cover"
                />
                {/* Información del doctor */}
                <div>
                    <h2 className="text-xl font-semibold text-black">
                    {doctor.doctorName}
                    </h2>

                    {/* Calificación */}
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span className="mr-1">
                        <Star color="#e4e802" strokeWidth={2.25} />
                    </span>
                    <span className="font-semibold text-black">{doctor.review}</span>
                    </div>

                    {/* Especialidades y cirujias */}
                    <div className="flex flex-col gap-1 text-sm text-gray-500 mt-2">
                    {doctor.services?.length > 0 && (
                        <div className="flex flex-col gap-1">
                        {doctor.services.map((s) => (
                            <div key={s.id} className="flex items-center gap-1 text-gray-500 text-sm">
                            <Stethoscope className="w-4 h-4" />
                            <span>{s.serviceName}</span>
                            </div>
                        ))}
                        </div>
                    )}
                    {doctor.surgeries?.length > 0 && (
                        <div className="flex flex-col gap-1">
                        {doctor.surgeries.map((s) => (
                            <div key={s.id} className="flex items-center gap-1 text-gray-500 text-sm">
                            <SquareActivity className="w-4 h-4" />
                            <span>{s.surgeryName}</span>
                            </div>
                        ))}
                        </div>
                    )}

                    </div>
                </div>
                </div>

                <div className="flex items-center justify-center mb-6 md:mb-0 md:w-48">
                <Button
                    className="w-1/2 md:w-full mr-0 md:mr-8"
                    onClick={() => window.open("https://wa.me/526561100446", "_blank")}
                >
                    <CalendarCheck className="mr-2" />
                    Solicitar cita
                </Button>
                </div>
            </div>
        </div>
    </Link>
    );
};

export default CardDoctor;
