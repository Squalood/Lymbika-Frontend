"use client"

import { useGetServices } from "@/api/getService"
import { useGetSugery } from "@/api/getSugery"
import {ResponseType} from '@/types/response';
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import Image from "next/image";
import { ServiceType } from "@/types/service";
import { SugeryType } from "@/types/sugery";

export default function Page (){
    const { result: servicesResult, loading: servicesLoading }: ResponseType = useGetServices();
    const { result: surgeryResult, loading: surgeryLoading }: ResponseType = useGetSugery();

    return(  
    
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Servicios</h3>

            {servicesLoading && 
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                </div>
            }

            <div className="grid gap-5 sm:grid-cols-3">
                {!servicesLoading && servicesResult?.map((service: ServiceType) => (
                    <Link 
                        key={service.id} 
                        href={`/services/${service.slug}`}
                        className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                    >
                        {service.image?.url ? (
                            <Image 
                                src={service.image.url}
                                alt={service.serviceName}
                                width={270}
                                height={200}
                                className="transition duration-300 ease-in-out rounded-lg hover:scale-110"
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
            
            <br/><br/>
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Cirugias</h3>

            {surgeryLoading && 
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                    <Skeleton className=" w-[250px] h-[250px] rounded-2xl" />
                </div>
            }
            <div className="grid gap-5 sm:grid-cols-3">
            {!surgeryLoading && surgeryResult?.map((sugery: SugeryType) => (
                <Link 
                    key={sugery.id} 
                    href={`/services/${sugery.slug}`}
                    className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg"
                >
                    {sugery.image?.url ? (
                        <Image 
                            src={sugery.image.url}
                            alt={sugery.surgeryName}
                            width={270}
                            height={200}
                            className="transition duration-300 ease-in-out rounded-lg hover:scale-110"
                        />
                    ) : (
                        <div className="w-[270px] h-[200px] bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-700">Sin imagen</span>
                        </div>
                    )}
                    <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                        {sugery.surgeryName}
                    </p>
                </Link>
            ))}
            </div>
        </div>
    );
}
