import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Stethoscope } from "lucide-react";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: Stethoscope,
    title: "Consulta de Nefrología",
    price: "$1,000 MXN",
    description: "Evaluación especializada de la salud renal con un enfoque integral y personalizado."
  },
  {
    icon: Activity,
    title: "Hemodiálisis",
    price: "desde $1,400 MXN",
    description: "Tratamiento de hemodiálisis con equipos de última generación y monitoreo constante."
  },
  {
    icon: Heart,
    title: "Evaluación Prediálisis",
    price: "Consultar precio",
    description: "Valoración completa y plan de tratamiento personalizado para pacientes prediálisis."
  }
];

export function Services() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="servicios" className="section bg-accent/30">
      <div ref={ref} className="container-xl">
        <h2 className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Nuestros Servicios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary">
                  {service.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}