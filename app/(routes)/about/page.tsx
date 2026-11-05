import type { Metadata } from "next";
import { getAboutPage } from "@/lib/strapi/pages";
import AboutPage from "./components/about-page";
import SlideImage from "./components/slideimage";
import LymbikaLocation from "./components/location";

export const metadata: Metadata = {
  title: "Nosotros | Lymbika Healthcare",
  alternates: { canonical: "/about" },
};

export default async function Page() {
  const about = await getAboutPage();

  return (
    <div>
      <SlideImage imageUrl={about?.hero_image?.url} />
      <AboutPage about={about} />
      <LymbikaLocation contact={about?.contact} />
    </div>
  );
}
