"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

    const services = [
      {
        title: "Horizon Scanning and Foresight",
        image: "/images/neuro-1.jpg",
        alt: "Horizon Scanning",
        description: "Looking ahead and using the power of foresight for future-readiness",
      },
      {
        title: "Strategic Insight and Innovation",
        image: "/images/neuro-2.jpg",
        alt: "Strategic Insight",
        description: "Analysing data to create a sustainable way forward",
      },
      {
        title: "Participatory Planning",
        image: "/images/neuro-3.jpg",
        alt: "Participatory Planning",
        description: "Collaborating with stakeholders for better impact",
      },
    ];

const NeuroterapiaPage = () => {
  return (
    <div>
        <div className="relative h-screen w-full overflow-hidden">
            {/* Imagen de fondo */}
            <Image
                src="/images/neurotherapy-front.png" 
                alt="Neuroterapia"
                fill
                priority
                className="object-cover grayscale brightness-90"
            />

            {/* Capa oscura sutil */}
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Contenido centrado */}
            <div className="absolute z-20 inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
                {/* Ícono de rayos (puedes personalizar esto con SVG o un componente de ícono) */}
                <div className="mb-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    className="w-10 h-10 mx-auto stroke-[2]"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36 6.36l-2.12-2.12M6.76 6.76 4.64 4.64m0 14.72 2.12-2.12m12.72-12.72-2.12 2.12" />
                </svg>
                </div>

                {/* Título principal */}
                <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-3">
                <span className="font-serif">NEUROTERAPIA</span>
                </h1>

                {/* Subtítulo */}
                <p className="text-xl md:text-2xl tracking-wide font-light mb-10">
                TERAPIA TRANSCRANEAL ELECTROMAGNÉTICA
                </p>

                {/* Botón */}
                <Link
                href="/citas"
                className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition rounded-md text-sm tracking-widest"
                >
                APARTA UNA CITA
                </Link>
            </div>
        </div>

        {/* separacion */}

        <div className="w-full px-6 py-16 my-8">
            <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Texto */}
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get <span className="text-teal-500">future-ready</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                Change is on the horizon and everyone needs to adapt to this fast-paced world. With over 15 years in consultancy, I have
                helped businesses of all kinds thrive amid change, through strategic innovation and bold vision. Work with me and get
                future-ready!
                </p>
            </div>

            {/* Imagen */}
            <div className="flex-1 flex justify-center">
                <div className="w-60 h-60 md:w-72 md:h-72 relative rounded-full overflow-hidden shadow-lg">
                <Image
                    src="/images/neuro-1.jpg"
                    alt="Smiling woman"
                    fill
                    className="object-cover"
                    priority
                />
                </div>
            </div>
        </div>

        {/* separacion */}

        <div className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Título */}
                <div className="flex justify-center items-center mb-12">
                <div className="w-12 h-1 bg-gray-700"></div>
                <h2 className="text-3xl font-bold mx-4 text-dark-gray">Services Offered</h2>
                <div className="w-12 h-1 bg-gray-700"></div>
                </div>

                {/* Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {services.map((service, index) => (
                    <div key={index} className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 relative rounded-full overflow-hidden shadow-lg grayscale">
                        <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-dark-gray mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button variant="outline">LEARN MORE</Button>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default NeuroterapiaPage;
