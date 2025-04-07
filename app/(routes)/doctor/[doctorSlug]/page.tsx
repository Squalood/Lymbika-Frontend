"use client"

import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import DoctorTop from "./components/doctor-top";
import { Separator } from "@/components/ui/separator";
import DoctorAbout from "./components/doctor-about";
import CalendarAvailability from "./components/doctor-schedule";

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
                description="Morbi vitae dui tincidunt, consectetur urna ultrices, egestas leo. Cras et vehicula lorem. Suspendisse consequat libero a enim lobortis vestibulum. Etiam a imperdiet leo. Aliquam erat volutpat. Cras hendrerit convallis sem at sodales. Donec turpis augue, venenatis nec sapien vitae, euismod facilisis nisl. Maecenas lacinia rhoncus eros at mattis. Duis ut diam a dolor vestibulum sodales a a nisi. Nulla eget scelerisque tortor. Vestibulum vehicula massa sem, in aliquet tellus dictum quis. Donec pretium felis nec."
                specialties="Internal medicine"
                licensedToPractice="TX"
                practiceName="Michael Omotola, DMSc, PA-C"
                languagesSpoken="English"
            />
            <Separator/>
            <CalendarAvailability/>
        </div>
    )
}