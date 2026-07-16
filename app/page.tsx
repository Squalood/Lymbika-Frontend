import CarouselServices from "@/components/carousel-services";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import TopContact from "@/components/top-contact";
import HospitaSection from "./(routes)/hospitals/components/hospitalsSection";
import DoctorReel from "./(routes)/doctor-catalog/components/doctorReel";
import SurgeryFaq from "./(routes)/surgery/components/surgeryFaq";
import TuristSection from "@/components/turistSection";
import ClinicsClientWrapper from "./(routes)/clinics/ClinicsClientWrapper";
import PromoCarousel from "@/components/promosection";
import Hero from "@/components/front-page";
import GalleryCarousel from "@/components/galleryCarousel";
import AlyusSection from "@/components/alyusSection";
import AreDoctorsSection from "@/components/areDoctorsSection";
import VideosSection from "@/components/videosSection";
import { PageType } from "@/types/pages";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getHomeData() {
  const [pageRes, heroRes, galleryRes] = await Promise.all([
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=front-page&populate=*`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=front-page&populate[hero][populate]=image&populate[promo][populate]=image`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `${BASE}/api/pages?filters[slug][$eq]=front-page&populate[gallery][populate]=images`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  const [pageJson, heroJson, galleryJson] = await Promise.all([
    pageRes.json(),
    heroRes.json(),
    galleryRes.json(),
  ]);

  const page: PageType | null = pageJson.data?.[0] ?? null;
  const heroPage: PageType | null = heroJson.data?.[0] ?? null;
  const gallery = galleryJson.data?.[0]?.gallery ?? null;

  return { page, heroPage, gallery };
}

export default async function Home() {
  const { page, heroPage, gallery } = await getHomeData();

  const heroData = heroPage?.hero;
  const promoData: PageType[] = page ? [page] : [];
  const promoItems = promoData.flatMap((p) => p.promo).filter((p) => p && p.image?.url);

  return (
    <main>
      <TopContact />
      <Hero hero={heroData} />
      <CarouselTextBanner />
      <TuristSection {...page?.landingPageJson?.turistSection} />
      <ClinicsClientWrapper />
      <CarouselServices />
      <DoctorReel />
      {promoItems.length > 0 && <PromoCarousel data={promoData} aspectRatio="video" />}
      <HospitaSection />
      <ChooseCategory />
      <AlyusSection {...page?.landingPageJson?.alyusSection} />
      {page && <VideosSection data={page} />}
      <GalleryCarousel gallery={gallery} />
      <SurgeryFaq />
      <AreDoctorsSection {...page?.landingPageJson?.areDoctorsSection} />
    </main>
  );
}
