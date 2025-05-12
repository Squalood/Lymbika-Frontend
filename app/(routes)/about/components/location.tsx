import Image from "next/image";

const LymbikaLocation = () => {
    return ( 
        <div className="max-w-4xl mx-auto py-20 px-6 sm:py-12">
            <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
                <div className="flex gap-4 flex-col flex-1">
                    <div className="flex gap-4 flex-col items-center">
                        <h2 className="text-xl sm:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-center">
                            Lymbika Health Hub
                        </h2>
                        <h3>
                            Tu punto de acceso a salud
                        </h3>
                        
                        <p className="text-base leading-relaxed">
                            <strong className="font-semibold">Lunes a sábado:</strong><br />
                            <span>08:00 - 21:30</span><br />
                            {/*<em className="text-muted-foreground">Domingo cerrado</em>*/}
                        </p>
                        <p className="text-center">
                            Resolveremos tus dudas de salud frente a frente, con atención humana, sin filas ni complicaciones.
Consultas médicas bajo cita, surtido de medicamentos y orientación personalizada.
                        </p>
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-md w-full aspect-square h-full flex-1">
                    <Image  src="/images/location.webp" alt="imagen" fill/>
                </div>
            </div>
        </div>
     );
}
 
export default LymbikaLocation;