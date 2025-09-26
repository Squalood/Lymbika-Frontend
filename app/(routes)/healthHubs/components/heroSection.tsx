import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { PageType } from "@/types/pages";

// 🔹 Beneficios estáticos
const benefits = [
  { icon: ArrowRight, text: "Colaboración entre médicos" },
  { icon: ArrowRight, text: "Acceso a pacientes" },
  { icon: ArrowRight, text: "Soporte administrativo" },
];

type MedicalHeroProps = {
  hero: PageType["hero"];
};

const MedicalHero = ({ hero }: MedicalHeroProps) => {
  if (!hero) return null;

  return (
    <section className="relative bg-gradient-to-br from-primary-light via-card to-background py-20 overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Columna izquierda */}
        <div className="space-y-8">
          <div className="space-y-6">
            {/* Badge estático */}
            <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
              👨‍⚕️ Nueva Red Médica
            </Badge>

            {/* Título desde API */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              {hero.title}
            </h1>

            {/* Descripción desde API */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {hero.description}
            </p>
          </div>

          {/* Badges de beneficios (estáticos) */}
          <div className="flex flex-wrap gap-3">
            {benefits.map((benefit, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center space-x-2 bg-card/90 text-foreground px-4 py-2 text-sm border border-primary/20"
              >
                <benefit.icon className="h-4 w-4 text-primary" />
                <span>{benefit.text}</span>
              </Badge>
            ))}
          </div>

          {/* Botón CTA desde API */}
          {hero.buttonText && hero.buttonUrl && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 text-lg px-8 py-6"
              >
                <Link
                  href={hero.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hero.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Columna derecha: Imagen desde API */}
        <Card className="overflow-hidden border-0 shadow-2xl">
          <div className="relative w-full h-[400px]">
            {hero.image?.url && (
              <Image
                src={hero.image.url}
                alt={hero.title}
                fill
                priority
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MedicalHero;