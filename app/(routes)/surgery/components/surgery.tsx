"use client"

import { useGetSugery } from "@/api/getSugery"
import {ResponseType} from '@/types/response';
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import Image from "next/image";
import { SugeryType } from "@/types/sugery";
import es from "@/locals/es.json";

const Surgery = () => {
    const { result: surgeryResult, loading: surgeryLoading }: ResponseType = useGetSugery();

    return(  
        <div>
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">{es.titlesurgery}</h3>
            {surgeryLoading && 
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className=" w-[250px] h-[200px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[200px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[200px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[200px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[200px] rounded-lg" />
                    <Skeleton className=" w-[250px] h-[200px] rounded-lg" />
                </div>
            }
            <div className="grid gap-5 sm:grid-cols-3">
            {!surgeryLoading && surgeryResult?.map((sugery: SugeryType) => (
                <Link 
                    key={sugery.id} 
                    href={`/surgery/${sugery.slug}`}
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

export default Surgery;