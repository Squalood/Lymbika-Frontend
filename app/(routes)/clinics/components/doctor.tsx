import { Card } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import doctorImage from "@/public/assets/doctor.jpg";
import Image from "next/image";

export function Doctor() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="doctora" className="section bg-accent/30">
      <div ref={ref} className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-primary/10" />
              <Image
                src={doctorImage}
                alt="Dra. Ana Karen Ramírez"
                className="relative z-10 w-full rounded-2xl doctor-image object-cover"
              />
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="mb-6 text-3xl font-bold">
              Dra. Ana Karen Ramírez
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Especialista en Nefrología con un enfoque integral en el cuidado de la salud renal. Mi compromiso es brindar atención personalizada y humana a cada paciente.
              </p>
              
              <Card className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Formación Académica</h4>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    <li>Especialidad en Nefrología</li>
                    <li>Subespecialidad en Trasplante Renal</li>
                    <li>Miembro de la Sociedad Mexicana de Nefrología</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Áreas de Especialización</h4>
                  <ul className="list-disc list-inside space-y-1 text-base">
                    <li>Tratamiento de enfermedades renales crónicas</li>
                    <li>Manejo integral de hemodiálisis</li>
                    <li>Evaluación y seguimiento de trasplante renal</li>
                    <li>Prevención y tratamiento de hipertensión</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}