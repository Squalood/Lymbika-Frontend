"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import es from "@/locals/es.json"

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  const text = [
    {
      user: es.HealtHub.Testimonials.item1.user,
      sub: es.HealtHub.Testimonials.item1.sub,
      comentary: es.HealtHub.Testimonials.item1.comentary,
      image: "https://lymbika.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzarkfmnl%2Fimage%2Fupload%2Fv1744735891%2F14_66751d9425.png&w=128&q=75"
    },
    {
      user: es.HealtHub.Testimonials.item2.user,
      sub: es.HealtHub.Testimonials.item2.sub,
      comentary:es.HealtHub.Testimonials.item2.comentary,
      image: "https://lymbika.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzarkfmnl%2Fimage%2Fupload%2Fv1744742803%2FPHOTO_2025_03_12_10_45_11_f63932ba0d.jpg&w=128&q=75"
    },
    {
      user:es.HealtHub.Testimonials.item3.user,
      sub: es.HealtHub.Testimonials.item3.sub,
      comentary:es.HealtHub.Testimonials.item3.comentary,
      image: "images/doc-1.png"
    },
    {
      user: es.HealtHub.Testimonials.item1.user,
      sub: es.HealtHub.Testimonials.item1.sub,
      comentary: es.HealtHub.Testimonials.item1.comentary,
      image: "https://lymbika.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzarkfmnl%2Fimage%2Fupload%2Fv1744735891%2F14_66751d9425.png&w=128&q=75"
    },
    {
      user: es.HealtHub.Testimonials.item2.user,
      sub: es.HealtHub.Testimonials.item2.sub,
      comentary:es.HealtHub.Testimonials.item2.comentary,
      image: "https://lymbika.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzarkfmnl%2Fimage%2Fupload%2Fv1744742803%2FPHOTO_2025_03_12_10_45_11_f63932ba0d.jpg&w=128&q=75"
    },
    {
      user:es.HealtHub.Testimonials.item3.user,
      sub: es.HealtHub.Testimonials.item3.sub,
      comentary:es.HealtHub.Testimonials.item3.comentary,
      image: "images/doc-1.png"
    },
    {
      user: es.HealtHub.Testimonials.item1.user,
      sub: es.HealtHub.Testimonials.item1.sub,
      comentary: es.HealtHub.Testimonials.item1.comentary,
      image: "https://lymbika.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzarkfmnl%2Fimage%2Fupload%2Fv1744735891%2F14_66751d9425.png&w=128&q=75"
    },
    {
      user: es.HealtHub.Testimonials.item2.user,
      sub: es.HealtHub.Testimonials.item2.sub,
      comentary:es.HealtHub.Testimonials.item2.comentary,
      image: "https://lymbika.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdzarkfmnl%2Fimage%2Fupload%2Fv1744742803%2FPHOTO_2025_03_12_10_45_11_f63932ba0d.jpg&w=128&q=75"
    },
    {
      user:es.HealtHub.Testimonials.item3.user,
      sub: es.HealtHub.Testimonials.item3.sub,
      comentary:es.HealtHub.Testimonials.item3.comentary,
      image: "images/doc-1.png"
    },
  ]

  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left mx-auto">
            {es.HealtHub.Testimonials.title}
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {text.map((text, index) => (
                <CarouselItem className="lg:basis-1/2" key={index}>
                  <div className="bg-muted rounded-md h-auto lg:col-span-2 p-6 aspect-video flex justify-between flex-col">
                    <User className="w-8 h-8 stroke-1" />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight">
                          {text.sub}
                        </h3>
                        <p className="text-muted-foreground max-w-xs text-base">
                        &quot;{text.comentary}&quot;
                        </p>
                      </div>
                      <p className="flex flex-row gap-2 text-sm items-center">
                        <span className="text-muted-foreground">By</span>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src= {text.image} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        <span>{text.user}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;