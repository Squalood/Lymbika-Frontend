"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ClinicType } from "@/types/clinic";
import Autoplay from "embla-carousel-autoplay";
import StarRating_Basic from "@/components/commerce-ui/star-rating-basic";
type TestimonialTexts = {
  badge: string;
  title: string;
  basedOn: string;
  reviewSingular: string;
  reviewPlural: string;
  reviewSuffix: string;
};

type TestimonialsProps = {
  list: ClinicType["testimonials"];
  texts: TestimonialTexts;
};

export default function Testimonials({ list, texts }: TestimonialsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const avgRating =
    list.length > 0
      ? list.reduce((sum, t) => sum + t.rating, 0) / list.length
      : 0;

  return (
    <section id="testimonios" className="section bg-background">
      <div ref={ref} className="max-w-4xl mx-4 md:mx-8 lg:mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-8 space-y-3 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge
            variant="secondary"
            className="text-xs font-bold tracking-widest uppercase"
          >
            {texts.badge}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold">
            {texts.title}
          </h2>
        </div>

        {/* Aggregate rating summary */}
        {list.length > 0 && (
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 bg-primary/5 border-l-4 border-l-primary rounded-r-xl px-6 py-5 mb-8 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-primary">
                {avgRating.toFixed(1)}
              </span>
              <StarRating_Basic
                value={Math.round(avgRating)}
                readOnly
                iconSize={20}
              />
            </div>
            <Separator
              orientation="vertical"
              className="h-8 hidden sm:block"
            />
            <p className="text-sm text-muted-foreground">
              {texts.basedOn}{" "}
              <span className="font-semibold text-foreground">
                {list.length}
              </span>{" "}
              {list.length === 1 ? texts.reviewSingular : texts.reviewPlural} {texts.reviewSuffix}
            </p>
          </div>
        )}

        {/* Carousel */}
        <div
          className={`transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {list.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 basis-2/3 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full flex flex-col border-l-4 border-l-primary relative overflow-hidden">
                    {/* Decorative quote icon */}
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary opacity-10" />

                    <CardHeader className="pb-2 px-6 pt-6 items-center">
                      <StarRating_Basic
                        value={testimonial.rating}
                        readOnly
                        iconSize={16}
                      />
                    </CardHeader>

                    <CardContent className="px-6 pb-2 flex-1 flex items-center">
                      <blockquote className="text-muted-foreground text-sm leading-relaxed text-center">
                        &quot;{testimonial.text}&quot;
                      </blockquote>
                    </CardContent>

                    <Separator className="mx-6 w-auto" />

                    <CardFooter className="px-6 py-4 justify-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm">
                          {testimonial.name}
                        </span>
                      </div>
                    </CardFooter>
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
