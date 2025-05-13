import { Button } from "@/components/ui/button";
import Image from "next/image";

const Cost = () => {
  return (
    <div className="w-full relative overflow-hidden py-20 lg:py-40">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/peso-footer.png" 
          alt="Background Cost Section"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" /> {/* Capa de oscurecimiento */}
      </div>
      {/* Contenido encima de la imagen */}
      <div className="relative z-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col text-center gap-4 items-center">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-white">
                ¿Listos para el cambio?
              </h3>
              <p className="text-lg leading-relaxed tracking-tight text-gray-300 max-w-xl mt-4">
                Consulta inicial desde $400 MXN
                <br />
                Programa integral desde $1249/mes 
              </p>
              <p className="text-lg leading-relaxed tracking-tight text-gray-300 max-w-xl">
                Resultados visibles desde el primer mes
              </p>
              <Button variant={"secondary"} className="w-1/2 mt-4" onClick={() => window.open("https://calendly.com/lymbikagroup/30min", "_blank")}>Agendar Cita</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cost;
