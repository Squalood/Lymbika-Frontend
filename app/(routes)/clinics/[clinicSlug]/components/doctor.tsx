"use client";

import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ClinicType } from "@/types/clinic";
import RichTextRenderer from "@/components/rich-text-renderer";

type DoctorProps = {
  data: ClinicType["doctor"];
};

export default function Doctor({ data }: DoctorProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-primary/10" />
              <Image
                src={data.image?.url || "/assets/doctor.jpg"}
                alt={data.name}
                width={600}
                height={800}
                className="relative z-10 w-full rounded-2xl doctor-image object-cover"
              />
            </div>
            <div className="mt-10 flex justify-center flex-col gap-4">
              <h2 className="text-sm text-gray-400">Médico Encargado</h2>
              <div className="space-y-6 text-lg">
                <h2 className="text-3xl font-bold">{data.name}</h2>
                <p className="text-muted-foreground">{data.description}</p> 
              </div>
            </div>
          </div>
          {/* Descripción e información */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div>
              <Card className="p-6 space-y-4">
                <RichTextRenderer content={data.points} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}