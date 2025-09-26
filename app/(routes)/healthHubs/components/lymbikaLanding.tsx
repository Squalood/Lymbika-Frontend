import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Building2, 
  Megaphone, 
  Pill, 
  FileText, 
  Bot, 
  ArrowRight,
  Shield,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";
import { useGetPlan } from "@/api/getPlans";
import PricingPaquetes from "./kits";
import MedicalHero from "./heroSection";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import MedicalHeroSkeleton from "@/components/skeleton/medicalHeroSkeleton";

const LymbikaLanding = () => {
  const features = [
    {
      icon: Building2,
      title: "Espacio físico para consulta",
      description: "Accede a consultorios equipados cuando los necesites, sin inversión inicial"
    },
    {
      icon: Megaphone,
      title: "Publicidad y posicionamiento",
      description: "Marketing digital especializado para hacer crecer tu práctica médica"
    },
    {
      icon: Pill,
      title: "Farmacia e insumos",
      description: "Plataforma integrada con farmacia y materiales quirúrgicos"
    },
    {
      icon: FileText,
      title: "Apoyo administrativo",
      description: "Credencialización hospitalaria y gestión de trámites simplificada"
    },
    {
      icon: Bot,
      title: "Asistente IA - Alyus",
      description: "Inteligencia artificial para seguimiento de pacientes y gestión médica"
    },
    {
      icon: Users,
      title: "Comunidad médica",
      description: "Red de doctores para referir pacientes y colaborar profesionalmente"
    }
  ];

  const benefits = [
    { icon: Shield, text: "Respaldo profesional integral" },
    { icon: Clock, text: "Ahorra tiempo en gestión" },
    { icon: Star, text: "Crece tu consulta" }
  ];

  const { hero, loading } = useGetPageHero("doctores");
  const { plan } = useGetPlan("doctores");

  const heroData = hero[0]?.hero;

  if (loading) return <MedicalHeroSkeleton />;

 return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <MedicalHero hero={hero[0]?.hero} />

      {/* Value Proposition */}
      <section className="py-16 bg-card w-full">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Aquí no trabajas solo
            <span className="text-primary"> Lymbika trabaja contigo</span>
          </h2>
          <Separator className="w-24 mx-auto bg-primary" />
          <p className="text-xl text-muted-foreground leading-relaxed">
            Si estás buscando crecer tu consulta, atender mejor a tus pacientes, 
            automatizar tu trabajo o simplemente ser parte de algo más grande… esta red es para ti.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-primary-light w-full">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-xl text-muted-foreground">
              Servicios integrales para hacer crecer tu práctica médica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border border-primary/20 bg-card/90 backdrop-blur-sm hover:border-primary/40">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto p-4 bg-primary/10 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PricingPaquetes data={plan}/>

      {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-primary w-full">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <Card className="bg-primary-foreground/95 border-0 shadow-2xl">
                <CardContent className="space-y-8 p-6 sm:p-8 md:p-12">
                    
                    <div className="space-y-6">
                    <Badge className="bg-primary text-primary-foreground text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3">
                        🔔 Únete Ahora
                    </Badge>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground">
                        ¿Quieres más pacientes y más valor en tu consulta? Únete a Lymbika.
                    </h2>

                    </div>

                    <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg sm:text-xl px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <Link href="https://wa.me/526561100446" target="_blank" rel="noopener noreferrer">
                        📲 Quiero unirme ahora
                        <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                      </Link>
                    </Button>
                </CardContent>
                </Card>
            </div>
        </section>
    </div>
  );
};

export default LymbikaLanding;