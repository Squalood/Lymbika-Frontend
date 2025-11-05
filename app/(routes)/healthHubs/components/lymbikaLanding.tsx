import {
  Ambulance,
  BriefcaseMedical,
  CalendarPlus,
  UserRoundPlus,
  ChartNoAxesCombined,
  Globe,
  Handshake,
  Presentation,
  Waypoints,
} from "lucide-react";
import { useGetPlan } from "@/api/getPlans";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import MedicalHero from "./heroSection";
import MedicalHeroSkeleton from "@/components/skeleton/medicalHeroSkeleton";
import PricingPaquetes from "./kits";
import CTASection from "./ctaSection";
import FeaturesSection from "./featuresSection";
import HowItWorksSection from "./howItWorksSection";
import MedicalKitsSection from "./infoKits";
import StatsSection from "./statsSection";
import ValuesSection from "./valuesSection";

const LymbikaLanding = () => {
  const values = [
    {
      title: "Red de Especialistas",
      description:
        "Accede a una comunidad médica dinámica donde los profesionales se refieren pacientes mutuamente. Amplía tu alcance y recibe referencias cualificadas de otros especialistas.",
    },
    {
      title: "Farmacia Especializada",
      description:
        "Adquiere medicamentos a precios de proveedor para tu consultorio y tus pacientes. Encontramos incluso aquellos productos que no están disponibles en farmacias tradicionales.",
    },
    {
      title: "Marketing Integral",
      description:
        "Posicionamiento SEO, clínica virtual, publicidad en redes sociales y estrategias de Google Ads diseñadas específicamente para profesionales de la salud.",
    },
  ];

  const features = [
    {
      icon: CalendarPlus,
      title: "Gestión de Estudios",
      description:
        "Coordinación eficiente de laboratorios, imagenología y procedimientos diagnósticos para tus pacientes.",
    },
    {
      icon: UserRoundPlus,
      title: "Health Companion",
      description:
        "Atención para que tus pacientes acudan mensualmente por su tratamiento, mejorando adherencia y seguimiento.",
    },
    {
      icon: Ambulance,
      title: "Urgencias Médicas",
      description:
        "Facilitamos todo en eventos quirúrgicos urgentes o necesidades inmediatas de tus pacientes.",
    },
    {
      icon: BriefcaseMedical,
      title: "Proveeduría Clínica",
      description:
        "Suministro completo para tu consultorio o unidad de salud con precios preferenciales.",
    },
  ];

  const stats = [
    {
      value: "150%",
      title: "Incremento mensual",
      subtitle: "Crecimiento promedio en consultas",
    },
    {
      value: "4+",
      title: "Referencias garantizadas",
      subtitle: "Consultas mínimas por mes",
    },
    {
      value: "24/7",
      title: "Soporte continuo",
      subtitle: "Gestión de urgencias médicas",
    },
  ];

  const steps = [
    {
      icon: UserRoundPlus,
      title: "Registro e Integración",
      description:
        "Selecciona tu membresía y completa tu perfil profesional. Nuestro equipo te guía en cada paso del proceso de onboarding.",
    },
    {
      icon: Waypoints,
      title: "Conexión con la Red",
      description:
        "Te intégramos inmediatamente a nuestra red de especialistas. Puedes comenzar a recibir y realizar referencias desde el primer día.",
    },
    {
      icon: Presentation,
      title: "Activación de Marketing",
      description:
        "Lanzamos tu clínica virtual, campañas digitales y posicionamiento SEO para maximizar tu visibilidad profesional.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Crecimiento Sostenido",
      description:
        "Monitorea tu crecimiento con analíticas detalladas. Ajustamos estrategias para optimizar resultados continuamente.",
    },
    {
      icon: Handshake,
      title: "Red Colaborativa",
      description:
        "Comunidad de especialistas que se apoyan mutuamente. Referencias cruzadas que benefician a todos los profesionales del ecosistema médico regional.",
    },
    {
      icon: Globe,
      title: "Visión Transfronteriza",
      description:
        "Aprovecha la posición estratégica de Ciudad Juárez. Atrae pacientes de ambos lados de la frontera con servicios especializados bilingües.",
    },
  ];

  const { hero, loading } = useGetPageHero("doctores");
  const { plan } = useGetPlan("doctores");

  if (loading) return <MedicalHeroSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <MedicalHero hero={hero[0]?.hero} />
      <ValuesSection values={values} />
      <StatsSection stats={stats} />
      <FeaturesSection features={features} />
      <PricingPaquetes data={plan} />
      <MedicalKitsSection />
      <HowItWorksSection steps={steps} />
      <CTASection />
    </div>
  );
};

export default LymbikaLanding;