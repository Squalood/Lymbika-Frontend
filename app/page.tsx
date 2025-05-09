import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import FlashContact from "@/components/flash-contact"
import FrontPage from "@/components/front-page"
import PlansMemberPage from "./(routes)/membership/components/plans"

export default function Home() {
  return (
    <main>
      <FlashContact/>
      <FrontPage />
      <CarouselServices/>
      <CarouselTextBanner />
      <ChooseCategory />
      <PlansMemberPage/>
      <BannerProduct />
    </main>
  )
}