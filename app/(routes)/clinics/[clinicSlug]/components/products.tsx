"use client";

import { ResponseType } from "@/types/response";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductType } from "@/types/product";
import ProductCard from "@/components/productCard";
import SkeletonSchema from "@/components/skeleton/skeletonSchema";
import { useGetClinicsProducts } from "@/api/useGetClinicsProducts";
import { ClinicType } from "@/types/clinic";
import { SearchGeneral } from "@/components/searchGeneral";
import { useGetProducts } from "@/api/getProducts";
import { useGetDoctors } from "@/api/getDoctor";

type ClinicProductsProps = {
  clinicSlug: string;
  clinicTitle: ClinicType["title"];
};

const ClinicProducts = ({ clinicSlug, clinicTitle }: ClinicProductsProps) => {
  const { loading, result }: ResponseType = useGetClinicsProducts(clinicSlug);

  const noProducts = !loading && (!result || result.length === 0);

  const { products } = useGetProducts();
  const { doctors } = useGetDoctors();

  return (
    <div className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl py-4 mx-auto sm:py-12 px-4">
      <h3 className="px-6 text-xl md:text-3xl sm:pb-8">Farmacia {clinicTitle}</h3>

      {/* Barra de búsqueda */}
      <div className="flex w-10/12 md:w-1/2 mt-2 mb-8 text-black">
        <SearchGeneral
          allProducts={products}
          allDoctors={doctors}
          allServices={[]}
          allSurgeries={[]}
          allCategories={[]}
        />
      </div>

      {loading ? (
        <SkeletonSchema grid={3} />
      ) : noProducts ? (
        <p className="text-center text-muted-foreground py-10">
          No hay productos disponibles para esta clínica.
        </p>
      ) : (
        <Carousel>
          <CarouselContent className="md:-ml-4 mt-4 md:mt-0">
            {result?.map((product: ProductType) => (
              <CarouselItem
                key={product.id}
                className="basis-3/4 md:basis-1/3 group"
              >
                <div className="">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      )}
    </div>
  );
};

export default ClinicProducts;
