import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CTASection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto bg-card text-card-foreground rounded-2xl shadow-sm p-8 md:p-12 space-y-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Transforma Tu Práctica Médica Hoy
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-center text-primary">
            Únete a la Revolución Médica en Ciudad Juárez
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-sm md:text-base text-muted-foreground">
            <p>
              Lymbika es más que una plataforma: es tu socio estratégico para
              el crecimiento profesional sostenible. Intégrate a una comunidad
              de especialistas innovadores que están transformando la atención
              médica en la región.
            </p>
            <p>
              Con presencia establecida en Ciudad Juárez, Chihuahua, ofrecemos
              infraestructura completa para impulsar tu práctica local e
              internacional. El futuro de tu consulta comienza aquí.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link
                  href="https://wa.me/526561100446"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Información
                  <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src="/assets/ctaDoctors.png"
              alt="Profesionales médicos"
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>

        <div className="bg-blue-100 text-blue-900 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-4 mt-6">
          <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-bold">Contacto Directo</h4>
            <p className="font-semibold">Lymbika Healthcare Network</p>
            <p>Ciudad Juárez, Chihuahua, México</p>
            <p className="text-sm">
              Atención especializada para profesionales de la salud en la
              región transfronteriza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;