import type { Metadata } from "next";
import MedicalHero from "./components/heroSection";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import PlansSection from "./components/plansSection";
import Section4 from "./components/section4";
import CTASection from "./components/ctaSection";
import FaqCard from "@/components/faq-card";
import { getFaqGroup, getHealthHubsData } from "@/lib/strapi/pages";

export const metadata: Metadata = {
  title: "¿Eres doctor? | Lymbika Healthcare",
  alternates: { canonical: "/healthHubs" },
};

export default async function Page() {
  const [{ page, heroPage, planPages }, faqDoctores] = await Promise.all([
    getHealthHubsData(),
    getFaqGroup("plan-doctores"),
  ]);

  const json = page?.landingPageJson;
  const faqTextos = json?.doctoresFaqSection;
  const hero = heroPage?.hero;

  return (
    <div className="min-h-screen bg-background">
      <MedicalHero hero={hero} stats={json?.doctoresHeroStats} />
      <Section1 data={json?.doctoresSection1} />
      <Section2 data={json?.doctoresSection2} />
      <Section3 data={json?.doctoresSection3} />
      <PlansSection
        data={planPages}
        texts={json?.doctoresPlansSection}
        modalPlan={planPages[0]?.ModalPlan?.[0]}
      />
      <Section4 data={json?.doctoresSection4} />
      {faqDoctores && (
        <FaqCard
          faqGroup={faqDoctores}
          align="left"
          label={faqTextos?.badge}
          title={faqTextos?.title}
          cardTitle={faqTextos?.cardTitle}
          cardSubtitle={faqTextos?.cardSubtitle}
          notice={faqTextos?.notice}
        />
      )}
      <CTASection data={json?.doctoresCtaSection} />
    </div>
  );
}
