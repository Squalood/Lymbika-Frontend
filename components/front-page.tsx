"use client";
import es from "@/locals/es.json";
import Image from "next/image";

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
                <h1 className="text-white text-3xl md:text-5xl xl:text-6xl font-bold leading-tight">
                    {es.frontpage.title}
                </h1>
                <p className="text-blue-100 text-sm md:text-2xl leading-snug mt-4">
                    {es.frontpage.description}
                </p>
            </div>
        </div>
    );
};

export default FrontPage;
