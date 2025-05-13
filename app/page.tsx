import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import FlashContact from "@/components/flash-contact"
import FrontPage from "@/components/front-page"
import PlansMemberPage from "./(routes)/membership/components/plans"
import Programs from "./(routes)/programs/components/navs"

export default function Home() {
  return (
    <main>
      <FlashContact/>
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