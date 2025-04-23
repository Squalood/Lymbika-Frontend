"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white text-neutral-900 font-sans">
        {/* Hero Section */}
        <div className="relative bg-cover bg-center h-[500px]">
            <Image
            src="/images/healthhubs.jpg"
            alt="Lymbika Health Hub"
            fill
            className="object-cover"
            priority
            />
            <div className="absolute bottom-10 left-10 z-10">
                <h1 className="text-4xl font-semibold text-white drop-shadow-lg">
                    Lymbika Health Hubs
                </h1>
            </div>
        </div>

        {/* ¿Cómo Funciona? Section */}
        <div className="bg-[#A84409] py-20 px-6 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="w-full">
                <Image
                src="/images/neuro-1.jpg"
                alt="Funcionamiento"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            <div>
                <h2 className="text-3xl font-semibold mb-4">¿Cómo funciona?</h2>
                <p className="mb-6 max-w-md">
                We believe that everyone deserves a space meant solely for them.
                Claim yours with our community of trusted brokers and diverse
                range of properties.
                </p>
                <button className="border border-white px-6 py-2 text-white hover:bg-white hover:text-[#A84409] transition">
                LEARN MORE
                </button>
            </div>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
                "A community of trusted brokers",
                "A space for work, a space for play",
                "A pleasant browsing experience",
            ].map((title, i) => (
                <div key={i} className="border border-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm">
                    Highlight a specific service or product. It can be a property
                    appraisal service, a consultation, or something uniquely yours.
                    Give it room to shine here.
                </p>
                </div>
            ))}
            </div>
        </div>

        {/* otra */}
        <div className="py-20 px-6 text-white">
            <div className="flex justify-center">

            </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full">
                <Image
                src="/images/neuro-2.jpg"
                alt="Contacto"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            <div>
                <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
                ¿Ya eres parte de nuestra red?
                </h2>
                <button className="bg-teal-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-teal-600 transition">
                Reserva una consulta
                </button>
                <div className="text-neutral-800 space-y-3">
                <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p>Calle 12 #34-56, Barranquilla</p>
                </div>
                <div>
                    <h4 className="font-semibold">Correo electrónico</h4>
                    <p>hola@sitioincreible.co</p>
                </div>
                <div>
                    <h4 className="font-semibold">Número telefónico</h4>
                    <p>300 123 4567</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}
