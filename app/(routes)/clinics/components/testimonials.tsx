import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "María González",
    text: "La atención de la Dra. Ana Karen ha sido excepcional. Su seguimiento constante y explicaciones claras me han ayudado a entender y manejar mejor mi condición.",
    rating: 5
  },
  {
    name: "Roberto Méndez",
    text: "El servicio de hemodiálisis es excelente. El equipo médico es muy profesional y el ambiente es tranquilo y limpio. Me siento en buenas manos.",
    rating: 5
  },
  {
    name: "Carmen Ortiz",
    text: "Agradezco la atención personalizada y el apoyo constante. El seguimiento por WhatsApp hace que me sienta respaldada en todo momento.",
    rating: 5
  },
  {
    name: "Juan Carlos Ruiz",
    text: "La Dra. Ramírez tiene un don especial para hacer que los pacientes se sientan cómodos y comprendidos. Su experiencia y profesionalismo son evidentes.",
    rating: 5
  }
];

export function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="testimonios" className="section bg-background">
      <div ref={ref} className="container-xl">
        <h2 className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Lo que dicen nuestros pacientes
        </h2>

        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <div className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <blockquote className="mb-4 text-muted-foreground">
                        "{testimonial.text}"
                      </blockquote>
                      <footer className="font-semibold">
                        {testimonial.name}
                      </footer>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}