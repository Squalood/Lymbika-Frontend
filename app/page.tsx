import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import TopContact from "@/components/top-contact"
import FrontPage from "@/components/front-page"
import Programs from "./(routes)/programs/components/navs"
import HospitaSection from "./(routes)/hospitals/components/hospitalsSection"
import PlanSection from "./(routes)/membership/components/plansSection"
import DoctorReel from "./(routes)/doctor-catalog/components/doctorReel"

export default function Home() {
  return (
    <main>
      <TopContact/>
      <FrontPage />
      <Programs/>
      <CarouselServices/>
      <DoctorReel/>
      <HospitaSection />
      <CarouselTextBanner />
      <ChooseCategory />
      <PlanSection/>
      <BannerProduct />
    </main>
  )
}