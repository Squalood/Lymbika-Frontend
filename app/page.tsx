import CarouselServices from "@/components/carousel-services";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import TopContact from "@/components/top-contact";
import HospitaSection from "./(routes)/hospitals/components/hospitalsSection";
import SurgeryFaq from "./(routes)/surgery/components/surgeryFaq";
import TuristSection from "@/components/turistSection";
import ClinicsClientWrapper from "./(routes)/clinics/ClinicsClientWrapper";
import PromoCarousel from "@/components/promosection";
import Hero from "@/components/front-page";
import GalleryCarousel from "@/components/galleryCarousel";
import AlyusSection from "@/components/alyusSection";
import AreDoctorsSection from "@/components/areDoctorsSection";
import VideosSection from "@/components/videosSection";
import { HomePageType } from "@/types/single-types/home";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

const SECTIONS_QUERY = [
  "populate[sections][on][hero.hero][populate][image][fields][0]=url",
  "populate[sections][on][home.text-banner][populate][item]=true",
  "populate[sections][on][home.turist-section][populate][testimonial]=true",
  "populate[sections][on][home.videos-section][populate][videos]=true",
  "populate[sections][on][home.promo-carousel][populate][promos][populate][image][fields][0]=url",
  "populate[sections][on][home.alyus-section][populate][features]=true",
  "populate[sections][on][home.alyus-section][populate][messages]=true",
  "populate[sections][on][gallery.gallery][populate][images][fields][0]=url",
  "populate[sections][on][home.are-doctors-section][populate][perks]=true",
  "populate[sections][on][home.are-doctors-section][populate][testimonial]=true",
  "populate[sections][on][home.clinics][fields][0]=title",
  "populate[sections][on][home.carousel-services][fields][0]=title",
  "populate[sections][on][home.carousel-services][fields][1]=subTitle",
  "populate[sections][on][home.hospital-section][fields][0]=title",
  "populate[sections][on][home.choose-category][fields][0]=title",
  "populate[sections][on][home.surgery-faq][populate][faq_group][populate][faq]=true",
].join("&");

async function getHomeData(): Promise<HomePageType | null> {
  try {
    const res = await fetch(
      `${BASE}/api/home-page?${SECTIONS_QUERY}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) {
      console.error("[home-page] Strapi error:", res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("[home-page] fetch failed:", err);
    return null;
  }
}

export async function generateMetadata() {
  const homePage = await getHomeData();
  if (!homePage?.seoTitle) return {};
  return {
    title: homePage.seoTitle,
    description: homePage.seoDescription,
  };
}

export default async function Home() {
  const homePage = await getHomeData();

  return (
    <main>
      <TopContact />
      {homePage?.sections.map((section) => {
        const sectionKey = `${section.__component}-${section.id}`;
        switch (section.__component) {
          case "hero.hero":
            return <Hero key={sectionKey} data={section} />;
          case "home.text-banner":
            return <CarouselTextBanner key={sectionKey} items={section.item} />;
          case "home.turist-section":
            return (
              <TuristSection
                key={sectionKey}
                label={section.label}
                title={section.title}
                description={section.description}
                videoId={section.videoId}
                videoLabel={section.videoLabel}
                ctaText={section.ctaText}
                ctaHref={section.ctaHref}
                testimonial={section.testimonial}
              />
            );
          case "home.videos-section":
            return (
              <VideosSection
                key={sectionKey}
                title={section.title}
                videos={section.videos}
              />
            );
          case "home.promo-carousel":
            return (
              <PromoCarousel
                key={sectionKey}
                aspectRatio={section.aspectRatio}
                promos={section.promos}
              />
            );
          case "home.alyus-section":
            return (
              <AlyusSection
                key={sectionKey}
                badge={section.badge}
                label={section.label}
                title={section.title}
                description={section.description}
                chatFooter={section.chatFooter}
                ctaText={section.ctaText}
                ctaHref={section.ctaHref}
                features={section.features}
                messages={section.messages}
              />
            );
          case "gallery.gallery":
            return (
              <GalleryCarousel
                key={sectionKey}
                gallery={{
                  id: section.id,
                  title: section.title ?? "",
                  images: section.images,
                }}
              />
            );
          case "home.are-doctors-section":
            return (
              <AreDoctorsSection
                key={sectionKey}
                badge={section.badge}
                title={section.title}
                description={section.description}
                ctaText={section.ctaText}
                ctaHref={section.ctaHref}
                perks={section.perks}
                testimonial={section.testimonial}
              />
            );
          case "home.clinics":
            return <ClinicsClientWrapper key={sectionKey} title={section.title} />;
          case "home.carousel-services":
            return <CarouselServices key={sectionKey} title={section.title} subTitle={section.subTitle} />;
          case "home.hospital-section":
            return <HospitaSection key={sectionKey} title={section.title} />;
          case "home.choose-category":
            return <ChooseCategory key={sectionKey} title={section.title} />;
          case "home.surgery-faq":
            return <SurgeryFaq key={sectionKey} title={section.title} faqGroup={section.faq_group} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
