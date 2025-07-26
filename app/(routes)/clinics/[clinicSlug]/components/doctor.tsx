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
    <section id="doctora" className="section bg-accent/30">
      <div ref={ref} className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen de la doctora */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0  translate-y-4 rounded-2xl bg-primary/10" />
              <Image
                src={data.image?.url || "/assets/doctor.jpg"}
                alt={data.name}
                width={600}
                height={800}
                className="relative z-10 w-full rounded-2xl doctor-image object-cover"
              />
            </div>
          </div>

          {/* Descripción e información */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="mb-6 text-3xl font-bold">{data.name}</h2>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>{data.description}</p>

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