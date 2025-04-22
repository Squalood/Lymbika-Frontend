import { Separator } from "@/components/ui/separator";
import { CheckCircle, ThumbsUp } from "lucide-react";

const DoctorComment = () => {
  return (
    <div>
        <div className="w-full pb-4 my-6">
            {/* Encabezado */}
            <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                <ThumbsUp className="w-4 h-4" />
                Satisfied
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
                Verified patient
                <CheckCircle className="w-4 h-4" />
            </div>
            </div>

            {/* Comentario */}
            <p className="text-gray-800 text-base mb-2">Very great, very friendly</p>

            {/* Fecha */}
            <p className="text-gray-500 text-sm">2 months ago</p>
        </div>
        <div>
            <Separator/>
        </div>
    </div>
    
  );
};

export default DoctorComment;