import BannerDiscount from "@/components/banner-discount"
import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import FeaturedProducts from "@/components/featured-products"
import FlashContact from "@/components/flash-contact"
import FrontPage from "@/components/front-page"

export default function Home() {
  return (
    <main>
      <FlashContact/>
      <FrontPage />
      <FeaturedProducts />
      <CarouselTextBanner />
      <BannerDiscount />
      <CarouselServices/>
      <ChooseCategory />
      <BannerProduct />
    </main>
  )
}

