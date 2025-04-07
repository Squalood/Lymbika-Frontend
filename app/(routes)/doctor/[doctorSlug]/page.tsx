"use client"

import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import DoctorTop from "./components/doctor-top";
import { Separator } from "@/components/ui/separator";
import DoctorAbout from "./components/doctor-about";

export default function Page (){
    const params = useParams()
    const {doctorSlug} = params;
    const { result }: ResponseType = useGetDoctorBySlug(doctorSlug ?? '')

    if (result == null){
        return <Skeleton/> 
    }

    return(
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <DoctorTop doctor={result[0]}/>
            <Separator/>
            <DoctorAbout
                description="mucha descripcion"
                specialties="Internal medicine"
                licensedToPractice="TX"
                practiceName="Michael Omotola, DMSc, PA-C"
                languagesSpoken="English"
            />
            <Separator/>
        </div>
    )
}