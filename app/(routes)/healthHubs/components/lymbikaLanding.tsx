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

 return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-light via-card to-background py-20 overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                👨‍⚕️ Nueva Red Médica
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Únete a la nueva 
                <span className="text-primary"> red médica</span> de Lymbika
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Una comunidad, un sistema, un respaldo. Lymbika es más que una plataforma: 
                es un ecosistema hecho por y para médicos.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-2 bg-card/90 text-foreground px-4 py-2 text-sm border border-primary/20">
                  <benefit.icon className="h-4 w-4 text-primary" />
                  <span>{benefit.text}</span>
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 text-lg px-8 py-6">
                Quiero unirme
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Conocer más
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="relative w-full h-[400px]"> 
              <Image
                src="/assets/hero-medical.jpg"
                alt="Doctores colaborando con tecnología médica"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </Card>
        </div>
      </section>

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
                        Haz crecer tu consulta y sé parte del nuevo sistema de salud
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                        Únete a miles de doctores que ya están transformando su práctica médica con Lymbika
                    </p>
                    </div>

                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg sm:text-xl px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 shadow-xl hover:shadow-2xl transition-all duration-300" onClick={() => window.open("https://wa.me/526561100446", "_blank")}>
                        📲 Quiero unirme ahora
                        <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </CardContent>
                </Card>
            </div>
        </section>
    </div>
  );
};

export default LymbikaLanding;