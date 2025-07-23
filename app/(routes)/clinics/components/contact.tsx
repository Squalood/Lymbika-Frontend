import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, Clock, MapPin } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const ContactNumber = () => {
    window.open('https://wa.me/526561100446');
  };

  return (
    <section id="contacto" className="section bg-accent/30">
      <div ref={ref} className="container-xl">
        <h2 className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Contacto y Ubicación
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`space-y-6 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-muted-foreground">Consultorio 913, Star Médica</p>
                    <p className="text-muted-foreground">Cd Juarez, México</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Horario de Atención</p>
                    <p className="text-muted-foreground">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sábados: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" onClick={ContactNumber}>
                <MessageSquare className="w-5 h-5" />
                Contactar por WhatsApp
              </Button>
              <Button size="lg" className="flex-1" asChild>
                <Link href="#" onClick={ContactNumber}>
                  <Calendar className="w-5 h-5" />
                  Agendar Cita
                </Link>
              </Button>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Card className="p-6 h-full">
              <div className="bg-accent/30 rounded-xl h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Consultorio 913, Star Médica</h3>
                  <p className="text-muted-foreground">
                    Cd Juarez, México
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}