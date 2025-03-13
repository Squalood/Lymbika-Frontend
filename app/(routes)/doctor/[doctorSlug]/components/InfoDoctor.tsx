import { Separator } from "@/components/ui/separator";
import { DoctorType } from "@/types/doctor";

export type InfoDoctorProps = {
    doctor: DoctorType
}

const InfoProduct = (props: InfoDoctorProps) => {
    const {doctor} = props

    return ( 
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl">{doctor.doctorName}</h1>
                
            </div>
            <Separator className="my-4"/>
            <div className="flex items-center justify-between gap-3">
                <p className="px-6 py-1 text-lg text-white bg-teal-400 w-fit rounded-full">
                    {doctor.service?.serviceName || "Sin servicio"}
                </p>
                <p className="px-6 py-1 text-lg text-white bg-teal-400 w-fit rounded-full">
                    {doctor.surgery?.surgeryName || ""}
                </p>
            </div>
        </div>
     );
}
 
export default InfoProduct;