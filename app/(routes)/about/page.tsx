import { AboutPageType } from "@/types/single-types/about";
import AboutPage from "./components/aboutPage";
import SlideImage from "./components/slideimage";
import LymbikaLocation from "./components/location";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getAboutPageContent(): Promise<AboutPageType | undefined> {
  const res = await fetch(
    `${BASE}/api/about-page?populate[value][populate]=*&populate[contact][populate][image]=true&populate[hero_image]=true`,
    { cache: "no-store" }
  );
  if (!res.ok) return undefined;
  const json = await res.json();
  return json.data ?? undefined;
}

export default async function Page() {
  const about = await getAboutPageContent();

  return (
    <div>
      <SlideImage imageUrl={about?.hero_image?.url} />
      <AboutPage about={about} />
      <LymbikaLocation contact={about?.contact} />
    </div>
  );
}
