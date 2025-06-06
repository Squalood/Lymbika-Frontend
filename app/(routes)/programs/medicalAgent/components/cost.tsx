import { Button } from "@/components/ui/button";
import es from "@/locals/es.json"
import Image from "next/image";

const Cost = () => {
    return ( 
        <div className="w-full relative overflow-hidden py-20 lg:py-40">
        {/* Imagen de fondo */}
            <div className="absolute inset-0">
                <Image
                    src="/images/agent-footer.png" 
                    alt="Background Cost Section"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-slate-200/20" /> {/* Capa de oscurecimiento */}
            </div>
            <div className="relative z-1">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col text-center py-14 gap-4 items-center">
                        <div className="flex flex-col">
                            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                                {es.MedicalAgentPage.section4.title}
                            </h3>
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl mt-4">
                                {es.MedicalAgentPage.section4.p1}
                            </p>
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                                {es.MedicalAgentPage.section4.p2}
                            </p>
                        </div>
                        <Button variant={"secondary"} className="mt-4" onClick={() => window.open("https://wa.me/526561100446", "_blank")}>Agendar Cita</Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cost;