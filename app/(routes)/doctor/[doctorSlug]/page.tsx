"use client"

import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import DoctorTop from "./components/doctor-top";
import { Separator } from "@/components/ui/separator";
import DoctorAbout from "./components/doctor-about";
import CalendarAvailability from "./components/doctor-schedule";
import SkeletonDoctor from "@/components/skeleton/doctorSkeletor";

export default function Page (){
    const params = useParams();
    const { doctorSlug } = params;
    const { loading, result }: ResponseType = useGetDoctorBySlug(doctorSlug ?? '');

    const doctor = result && result.length > 0 ? result[0] : null;

    if (loading || !doctor) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
                <SkeletonDoctor />
            </div>
        );
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
            <DoctorTop doctor={doctor} />
            <Separator />
            <DoctorAbout doctor={doctor} />
            <Separator />
            <CalendarAvailability />
        </div>
    );
}
