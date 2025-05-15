import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import TopContact from "@/components/top-contact"
import FrontPage from "@/components/front-page"
import PlansMemberPage from "./(routes)/membership/components/plans"
import Programs from "./(routes)/programs/components/navs"

export default function Home() {
  return (
    <main>
      <TopContact/>
      <FrontPage />
      <Programs/>
      <CarouselServices/>
      <CarouselTextBanner />
      <ChooseCategory />
      <PlansMemberPage/>
      <BannerProduct />
    </main>
  )
}