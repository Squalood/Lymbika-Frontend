"use client"

import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import CarouselDoctor from "./components/CarouselDoctor";
import InfoDoctor from "./components/InfoDoctor";

export default function Page (){
    const params = useParams()
    const {doctorSlug} = params;
    const { result }: ResponseType = useGetDoctorBySlug(doctorSlug ?? '')

    if (result == null){
        return <Skeleton/> 
    }

    return(
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <div className="grid sm:grid-cols-2">
                <div>
                    <CarouselDoctor images={result[0].image}/>
                </div>

                <div className="sm:px-12">
                    <InfoDoctor doctor={result[0]}/>
                </div>
            </div>
            
        </div>
    )
}