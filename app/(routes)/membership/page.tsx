"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
    return (
        //<PlansMemberPage/>
        <div className="flex flex-col items-center max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Membresía</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <div className="w-full sm:w-1/2 flex justify-center">
                    <Image
                        src="/membership.png"
                        alt="membership image"
                        width={690}
                        height={690}
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="w-full sm:w-1/2 text-center sm:text-left flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold">El ahorro es ahora</h2>
                    <p className="text-gray-600 mt-2">
                    Con nuestra membresía mensual MediClub, accede a medicamentos y productos de la salud a precio de proveedor,
                    diseñado para cuidar la economía de nuestros pacientes. 
                    </p>
                    <ul className="mt-8 mb-8 list-disc list-inside">Por solo $200 MXN/mes, los miembros de Mediclub obtienen:
                        <li>Medicamentos de patente a precios de proveedor</li>
                        <li>Genéricos de alta calidad a precios de proveedor</li>
                        <li>Medicamentos controlados a precios de proveedor (con receta válida)</li>
                        <li>Medicamentos de especialidad (para tratamientos específicos)</li>
                    </ul>
                    <Button className="mt-10 w-1/4">Comprar</Button>
                </div>
            </div>
        </div>
        
    );
}