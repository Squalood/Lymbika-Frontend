"use client";

import { ReviewType } from "@/types/review";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Star } from "lucide-react";

interface DoctorReviewCarouselProps {
  reviews: ReviewType[];
}

// Función para recortar texto
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const DoctorReviewCarousel = ({ reviews }: DoctorReviewCarouselProps) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (reviews.length === 0) return <p>No hay reseñas disponibles.</p>;

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

  const avgWaitingTime = sum.waitingTime / total;
  const avgRecommend = sum.recommend / total;
  const avgBedside = sum.bedsideManner / total;
  const avgVisitAgain = sum.visitAgain / total;
  const avgTotal = (avgWaitingTime + avgRecommend + avgBedside + avgVisitAgain) / 4;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl mx-auto my-auto"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {reviews.map((review) => (
            <CarouselItem key={review.id} className="p-1 text-center">
                <div className="bg-muted rounded-md p-2 space-y-3">
                    <p className="text-muted-foreground text-sm italic">
                    &ldquo;{truncateText(review.comment, 120)}&rdquo;
                    </p>
                </div>

                {/* Bloque de promedio debajo */}
                <div className="flex items-center justify-center gap-1 mt-2 text-sm text-primary font-medium">
                    <Star className="w-4 h-4 fill-primary" strokeWidth={1.5} />
                    <span>{avgTotal.toFixed(1)} / 5.0</span>
                </div>
            </CarouselItem>

        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DoctorReviewCarousel;