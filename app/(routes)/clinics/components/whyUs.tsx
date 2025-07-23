import { Card } from "@/components/ui/card";
import { MessageSquare, Clock, PiggyBank, Heart } from "lucide-react";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: Clock,
    title: "Seguimiento 24/7",
    description: "Atención continua por WhatsApp y plataforma médica"
  },
  {
    icon: MessageSquare,
    title: "Atención Híbrida",
    description: "Consultas presenciales y seguimiento remoto"
  },
  {
    icon: PiggyBank,
    title: "Descuentos Especiales",
    description: "Beneficios en farmacia y estudios médicos"
  },
  {
    icon: Heart,
    title: "Trasplante Renal",
    description: "Apoyo y orientación para acceso a trasplante"
  }
];

export function WhyUs() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="por-que-elegirnos" className="section bg-background">
      <div ref={ref} className="container-xl">
        <h2 className={`text-center mb-12 text-3xl font-bold transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          ¿Por qué elegirnos?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`p-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}