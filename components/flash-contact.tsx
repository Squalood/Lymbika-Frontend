import { MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FlashContact = () => {
    return ( 
        <div className="hidden sm:absolute sm:top-0 xl:left-[200px] xl:right-[200px] sm:left-[50px] sm:right-[50px] sm:block z-50 text-gray-200 py-2">
            <div className="w-full flex justify-start">
                <ul className="flex space-x-6">
                    <li>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5" />
                            <span className="ml-2">Av. Paseo de la Victoria 9350, Partido Senecú, Juárez, Chih.</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <Phone className="w-5 h-5" />
                            <span className="ml-2">+52-656-110-0446</span>
                        </div>
                    </li>
                </ul>
            </div>
            <Separator className="mt-1 opacity-50"/>
        </div>
    );
}

export default FlashContact;
