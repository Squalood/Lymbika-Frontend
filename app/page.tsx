"use client";

import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import TopContact from "@/components/top-contact"
import FrontPage from "@/components/front-page"
import HospitaSection from "./(routes)/hospitals/components/hospitalsSection"
import PlanSection from "./(routes)/membership/components/plansSection"
import DoctorReel from "./(routes)/doctor-catalog/components/doctorReel"
import SurgeryFaq from "./(routes)/surgery/components/surgeryFaq"
import TuristSection from "@/components/turistSection"
import Page from "./(routes)/clinics/page"
import PromoCarousel from "@/components/promosection"
import { useGetPromo } from "@/api/getPromo"

export default function Home() {
  const {promo} = useGetPromo("front-page");

  return (
    <main>
      <TopContact/>
      <FrontPage />
      <Page/>
      <CarouselServices/>
      <DoctorReel/>
      {promo && promo.length > 0 && (
        <PromoCarousel data={promo} />
      )}
      <HospitaSection />
      <CarouselTextBanner />
      <ChooseCategory />
      <PlanSection/>
      <TuristSection/>
      <SurgeryFaq/>
      <BannerProduct />
    </main>
  )
}