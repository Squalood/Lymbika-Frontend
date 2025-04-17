"use client"

import { useGetServices } from "@/api/getService"
import {ResponseType} from '@/types/response';
import Link from "next/link";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import es from "@/locals/es.json";
import SkeletonGalleryCol3 from "@/components/skeleton/skeletonGalleryCol3";

const Specialties= () => {
    const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();

    return(  
    <div>
        <h3 className="px-6 pb-4 text-3xl sm:pb-8">{es.titleServices}</h3>

        {servicesLoading ? (
        <SkeletonGalleryCol3 grid={12}/>
        ) : (
        <div className="grid gap-5 sm:grid-cols-3 grid-cols">
            {servicesResult?.map((service: ServiceType) => (
            <Link 
                key={service.id} 
                href={`/service/${service.slug}`}
                className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
            >
                {service.image?.url ? (
                <Image 
                    src={service.image.url}
                    alt={service.serviceName}
                    width={270}
                    height={200}
                    className="transition duration-300 ease-in-out rounded-lg hover:scale-110 sm:max-h-[220px] w-full h-auto"
                />
                ) : (
                <div className="w-[270px] h-[200px] bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-700">Sin imagen</span>
                </div>
                )}
                <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                {service.serviceName}
                </p>
            </Link>
            ))}
        </div>
        )}
    </div>
    );
}

export default Specialties;