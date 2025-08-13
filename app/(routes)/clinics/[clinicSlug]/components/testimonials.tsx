"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ClinicType } from "@/types/clinic";
import Autoplay from "embla-carousel-autoplay";

type TestimonialsProps = {
  list: ClinicType["testimonials"];
};

export default function Testimonials({ list }: TestimonialsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="testimonios" className="section bg-background">
      <div ref={ref} className="max-w-4xl mx-4 md:mx-8 lg:mx-auto">
        <h2 className={`text-center text-3xl font-bold mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Lo que dicen nuestros pacientes
        </h2>

        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {list.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <div className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <blockquote className="mb-4 text-muted-foreground">
                        &quot;{testimonial.text}&quot;
                      </blockquote>
                      <footer className="font-semibold">
                        {testimonial.name}
                      </footer>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}