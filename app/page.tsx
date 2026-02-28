"use client";

import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import TopContact from "@/components/top-contact"
import HospitaSection from "./(routes)/hospitals/components/hospitalsSection"
import PlanSection from "./(routes)/membership/components/plansSection"
import DoctorReel from "./(routes)/doctor-catalog/components/doctorReel"
import SurgeryFaq from "./(routes)/surgery/components/surgeryFaq"
import TuristSection from "@/components/turistSection"
import Page from "./(routes)/clinics/page"
import PromoCarousel from "@/components/promosection"
import { useGetPromo } from "@/api/getPromo"
import Hero from "@/components/front-page";
import { useGetPageHero } from "@/api/getPageHeroBySlug";
import HeroSkeleton from "@/components/skeleton/heroSkeleton";
import GalleryCarouselSkeleton from "@/components/skeleton/galleryCarouselSkeleton";
import TuristSectionSkeleton from "@/components/skeleton/turistSectionSkeleton";
import GalleryCarousel from "@/components/galleryCarousel";
import { useGetPage } from "@/api/getPageBySlug";
import { useGetGallery } from "@/api/getGalleryBySlug";
import AlyusSection from "@/components/alyusSection";
import AreDoctorsSection from "@/components/areDoctorsSection";

export default function Home() {
  const { page, loading: pageLoading } = useGetPage("front-page");
  const { hero, loading } = useGetPageHero("front-page");
  const {promo} = useGetPromo("front-page");
  const { gallery, loading: galleryLoading } = useGetGallery("front-page");
  const promoItems = promo?.flatMap(page => page.promo).filter(p => p && p.image?.url) || [];

  const heroData = hero[0]?.hero;

  return (
    <main>
      <TopContact/>
      {loading ? <HeroSkeleton /> : <Hero hero={heroData}/>}
      <CarouselTextBanner />
      <Page/>
      {pageLoading ? <TuristSectionSkeleton /> : <TuristSection title={page[0]?.videos?.[0]?.title} videoId={page[0]?.videos?.[0]?.videoID}/>}
      <CarouselServices/>
      <DoctorReel/>
      {promoItems.length > 0 && <PromoCarousel data={promo} aspectRatio="video"/>}
      <HospitaSection />
      <ChooseCategory />
      <PlanSection/>
      {galleryLoading ? <GalleryCarouselSkeleton /> : <GalleryCarousel gallery={gallery}/>}
      <SurgeryFaq/>
      <AlyusSection/>
      <AreDoctorsSection/>
    </main>
  )
}