import BannerDiscount from "@/components/banner-discount"
import BannerProduct from "@/components/banner-product"
import CarouselServices from "@/components/carousel-services"
import CarouselTextBanner from "@/components/carousel-text-banner"
import ChooseCategory from "@/components/choose-category"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts />
      <BannerDiscount />
      <CarouselServices/>
      <ChooseCategory />
      <BannerProduct />
    </main>
  )
}

