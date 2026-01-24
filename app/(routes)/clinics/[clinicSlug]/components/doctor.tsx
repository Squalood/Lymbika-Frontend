"use client";

import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ClinicType } from "@/types/clinic";
import RichTextRenderer from "@/components/rich-text-renderer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type DoctorProps = {
  data: ClinicType["doctor"];
  doctorPageSlug?: string;
};

export default function Doctor({ data, doctorPageSlug }: DoctorProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="doctora" className="section bg-accent/50">
      <div ref={ref} className="max-w-4xl mx-4 md:mx-8 lg:mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen del doctor*/}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 left-20 right-20 sm:left-0 sm:right-0 translate-x-4 translate-y-4 rounded-2xl bg-primary/10" />
              <Image
                src={data.image?.url || "/placeholder-image.webp"}
                alt={data.name}
                width={600}
                height={800}
                className="relative z-10 w-1/2 sm:w-full rounded-2xl doctor-image object-cover mx-auto"
              />
            </div>
            <div className="mt-10 flex justify-center flex-col gap-4 px-6 sm:px-0">
              <h2 className="text-sm text-gray-400">Médico Encargado</h2>
              <div className="space-y-6">
                {doctorPageSlug ? (
                  <Link href={`/doctor/${doctorPageSlug}`} className="text-2xl sm:text-3xl font-bold hover:text-primary transition-colors">
                    {data.name}
                  </Link>
                ) : (
                  <h2 className="text-2xl sm:text-3xl font-bold">{data.name}</h2>
                )}
                <p className="text-muted-foreground text-base sm:text-lg">{data.description}</p> 
              </div>
            </div>
          </div>
          {/* Descripción e información */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative px-4">
              <Card
                className={`
                  relative p-6 space-y-4 text-sm sm:text-base overflow-hidden 
                  transition-all duration-700 ease-in-out
                  max-h-[250px] md:max-h-none
                  ${expanded ? "max-h-[900px]" : ""}
                `}
              >
                <div className="transition-opacity duration-700 ease-in-out">
                  <RichTextRenderer content={data.points} />
                </div>

                {/* Gradiente visible solo en móvil */}
                <div
                  className={`
                    absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent opacity-90 pointer-events-none 
                    ${expanded ? "hidden" : "block"} 
                    md:hidden
                  `}
                />

                {/* Botón visible solo en móvil */}
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className={`
                    absolute bottom-4 left-1/2 -translate-x-1/2 text-black
                    rounded-full p-2 shadow-md hover:bg-primary/90 transition-all duration-300 z-10
                    md:hidden
                  `}
                  aria-label="Mostrar más"
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-500 ${
                      expanded ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}