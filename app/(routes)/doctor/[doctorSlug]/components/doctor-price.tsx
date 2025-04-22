import { formatPrice } from "@/lib/formatPrice";
import { DoctorType } from "@/types/doctor";
import { InfoIcon } from "lucide-react"; 

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const DoctorPrice = ({ doctor }: InfoDoctorProps) => {
  const consultPrice = Number(doctor.priceCon);

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 shadow-sm border border-blue-100 w-full justify-center">
      <div className="p-2 bg-blue-100 rounded-full text-blue-700">
        <InfoIcon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-gray-600">Precio de consulta</p>
        <p className="text-xl font-semibold text-blue-800">{formatPrice(consultPrice)}</p>
      </div>
    </div>
  );
};

export default DoctorPrice;
