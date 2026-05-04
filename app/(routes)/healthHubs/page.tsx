import { PageType } from "@/types/pages";
import MedicalHero from "./components/heroSection";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import PlansSection from "./components/plansSection";
import Section4 from "./components/section4";
import FaqSection from "./components/faqSection";
import CTASection from "./components/ctaSection";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getHealthHubsData() {
  const [pageRes, heroRes, planRes] = await Promise.all([
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=doctores&populate=*`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=doctores&populate[hero][populate]=image&populate[promo][populate]=image`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=doctores&populate[plan][populate]=*&populate[ModalPlan][populate][TrustStep]=*`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  const [pageJson, heroJson, planJson] = await Promise.all([
    pageRes.json(),
    heroRes.json(),
    planRes.json(),
  ]);

  const page: PageType | null = pageJson.data?.[0] ?? null;
  const heroPage: PageType | null = heroJson.data?.[0] ?? null;
  const planPages: PageType[] = planJson.data ?? [];

  return { page, heroPage, planPages };
}

export default async function Page() {
  const { page, heroPage, planPages } = await getHealthHubsData();

  const json = page?.landingPageJson;
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
      <FaqSection data={json?.doctoresFaqSection} />
      <CTASection data={json?.doctoresCtaSection} />
    </div>
  );
}
