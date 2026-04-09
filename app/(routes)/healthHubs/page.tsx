"use client";

import { useGetPageHero } from "@/api/getPageHeroBySlug";
import { useGetPlan } from "@/api/getPlans";
import { useGetPage } from "@/api/getPageBySlug";
import MedicalHeroSkeleton from "@/components/skeleton/medicalHeroSkeleton";
import SectionSkeleton from "@/components/skeleton/sectionSkeleton";
import MedicalHero from "./components/heroSection";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import PlansSection from "./components/plansSection";
import Section4 from "./components/section4";
import FaqSection from "./components/faqSection";
import CTASection from "./components/ctaSection";

export default function Page() {
  const { hero, loading: heroLoading } = useGetPageHero("doctores");
  const { plan } = useGetPlan("doctores");
  const { page, loading: pageLoading } = useGetPage("doctores");

  const json = page[0]?.landingPageJson;
  const sectionsLoading = heroLoading || pageLoading;

  return (
    <div className="min-h-screen bg-background">
      {heroLoading ? <MedicalHeroSkeleton /> : <MedicalHero hero={hero[0]?.hero} stats={json?.doctoresHeroStats} />}
      {sectionsLoading ? (
        <>
          <SectionSkeleton rows={4} />
          <SectionSkeleton rows={3} hasImage />
          <SectionSkeleton rows={3} />
          <SectionSkeleton rows={3} />
          <SectionSkeleton rows={5} />
          <SectionSkeleton rows={2} />
        </>
      ) : (
        <>
          <Section1 data={json?.doctoresSection1} />
          <Section2 data={json?.doctoresSection2} />
          <Section3 data={json?.doctoresSection3} />
          <PlansSection data={plan} texts={json?.doctoresPlansSection} />
          <Section4 data={json?.doctoresSection4} />
          <FaqSection data={json?.doctoresFaqSection} />
          <CTASection data={json?.doctoresCtaSection} />
        </>
      )}
    </div>
  );
}
