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
import { useGetPage } from "@/api/getPageBySlug";

const LymbikaLanding = () => {


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

  const { hero, loading } = useGetPageHero("doctores");
  const { plan } = useGetPlan("doctores");

  const { page } = useGetPage("doctores");
  const pageData = page[0];

  if (loading) return <MedicalHeroSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <MedicalHero hero={hero[0]?.hero} />
      <ValuesSection values={pageData?.values || []} />
      <StatsSection stats={stats} />
      <FeaturesSection features={pageData?.features || []} />
      <PricingPaquetes data={plan} />
      <MedicalKitsSection/>
      <HowItWorksSection steps={pageData?.steps || []} />
      <CTASection />
    </div>
  );
};

export default LymbikaLanding;