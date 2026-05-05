import { PageType } from "@/types/pages";
import AboutPage from "./components/aboutPage";
import SlideImage from "./components/slideimage";
import LymbikaLocation from "./components/location";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getAboutData(): Promise<PageType["Contact"] | undefined> {
  const res = await fetch(
    `${BASE}/api/pages?filters[slug][$eq]=about&populate[Contact][populate]=*`,
    { next: { revalidate: 3600 } }
  );
  const json = await res.json();
  return json.data?.[0]?.Contact ?? undefined;
}

export default async function Page() {
  const contact = await getAboutData();

  return (
    <div>
      <SlideImage />
      <AboutPage />
      <LymbikaLocation contact={contact} />
    </div>
  );
}
