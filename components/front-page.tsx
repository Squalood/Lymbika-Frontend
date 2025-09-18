"use client";
import es from "@/locals/es.json";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FrontPage = () => {
  return (
    <div className="relative rounded-br-[5rem] bg-primary px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden lg:py-[18rem] py-48 flex items-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/front-page.jpg"
          alt="imagen"
          fill
          className="w-full h-full object-cover opacity-25"
        />
      </div>

      {/* Contenido del texto */}
      <div className="relative z-10 lg:w-3/4 xl:w-2/4">
        <h1 className="text-white text-2xl md:text-5xl font-bold leading-tight">
          {es.frontpage.title}
        </h1>
        <p className="text-blue-100 text-sm md:text-xl leading-snug mt-4 w-5/6 md:w-full">
          {es.frontpage.description}
        </p>

        {/* Botón CTA */}
        <div className="mt-6">
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-primary md:text-lg" asChild>
                <Link 
                    className="zl-facility-url"
                    href="https://www.doctoralia.com.mx/clinicas/zynera-unidad-de-especialistas-by-lymbika"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    data-zlw-facility="zynera-unidad-de-especialistas-by-lymbika"
                    data-zlw-type="facility-button-with-saas-only"
                    data-zlw-saas-only="true"
                    data-zlw-a11y-title="Widget de reserva de citas médicas"
                >
                    Consulta con especialista en 24h
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
