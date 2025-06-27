import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import TopContact from "@/components/top-contact"
import FrontPage from "@/components/front-page"
import PlansMemberPage from "./(routes)/membership/components/plans"
import Programs from "./(routes)/programs/components/navs"
import HospitaSection from "./(routes)/hospitals/components/hospitalsSection"

export default function Home() {
  return (
    <main>
      <TopContact/>
      <FrontPage />
      <Programs/>
      <CarouselServices/>
      <HospitaSection />
      <CarouselTextBanner />
      <ChooseCategory />
      <PlansMemberPage/>
      <BannerProduct />
    </main>
  )
}