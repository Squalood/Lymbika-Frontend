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

export default function Home() {
  return (
    <main>
      <TopContact/>
      <FrontPage />
      <Page/>
      <CarouselServices/>
      <DoctorReel/>
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