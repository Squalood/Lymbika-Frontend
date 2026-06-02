import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import { Separator } from "@/components/ui/separator";
import NavegatorPages from "@/components/navegatorPages";
import VideoCarousel from "@/components/VideoCarousel";
import ProductReviews from "./components/product-reviews";
import { ProductType } from "@/types/product";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getProduct(slug: string): Promise<ProductType | null> {
  const res = await fetch(
    `${BASE}/api/products?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 3600 } }
  );
  const json = await res.json();
  return json.data?.[0] ?? null;
}

type Props = { params: Promise<{ productSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);
  if (!product) return {};
  const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://lymbika.com";
  return {
    title: `${product.productName} | Lymbika`,
    description: product.description,
    alternates: {
      canonical: `${FRONTEND}/product/${productSlug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);

  if (!product) notFound();

  const FRONTEND = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://lymbika.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description: product.description || product.productName,
    ...(product.images?.length > 0 && {
      image: product.images.map((img) =>
        img.url.startsWith("http") ? img.url : `${BASE}${img.url}`
      ),
    }),
    offers: {
      "@type": "Offer",
      priceCurrency: "MXN",
      ...(product.price > 0 && { price: product.price }),
      availability: "https://schema.org/InStock",
      url: `${FRONTEND}/product/${product.slug}`,
    },
    ...(product.category?.categoryName && {
      category: product.category.categoryName,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
        <div className="sm:ml-1 ml-3">
          <NavegatorPages product={product} />
        </div>
        <Separator className="my-4" />
        <div className="grid sm:grid-cols-2">
          <div>
            <CarouselProduct product={product} />
          </div>
          <div className="sm:px-12">
            <InfoProduct product={product} />
          </div>
        </div>
        <VideoCarousel videos={product.videos || []} />
        <Separator className="my-8" />
        <ProductReviews productSlug={productSlug} productId={product.id} />
      </div>
    </>
  );
}
