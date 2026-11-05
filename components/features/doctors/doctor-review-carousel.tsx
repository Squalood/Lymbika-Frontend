"use client";

import { ReviewType } from "@/types/review";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Star } from "lucide-react";

interface DoctorReviewCarouselProps {
  reviews: ReviewType[];
}

const DoctorReviewCarousel = ({ reviews }: DoctorReviewCarouselProps) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (reviews.length === 0) return <p className="text-sm text-muted-foreground">No hay reseñas disponibles.</p>;

  // Calcular promedios
  const total = reviews.length;
  const sum = reviews.reduce(
    (acc, review) => {
      acc.waitingTime += review.waitingTime;
      acc.recommend += review.recommend;
      acc.bedsideManner += review.bedsideManner;
      acc.visitAgain += review.visitAgain;
      return acc;
    },
    { waitingTime: 0, recommend: 0, bedsideManner: 0, visitAgain: 0 }
  );

  const avgTotal = (sum.waitingTime + sum.recommend + sum.bedsideManner + sum.visitAgain) / (4 * total);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{ loop: true }}
    >
      <CarouselContent className="h-[150px] sm:h-[130px]">
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="h-full">
            <div className="flex flex-col justify-center items-center h-full px-2 text-center">
              <div className="p-2 max-h-[96px] w-full overflow-hidden">
                <p className="text-muted-foreground text-sm italic line-clamp-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2 text-sm text-primary font-medium">
                <Star className="w-4 h-4 fill-primary" strokeWidth={1.5} />
                <span>{avgTotal.toFixed(1)} / 5.0</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DoctorReviewCarousel;