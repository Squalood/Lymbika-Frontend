"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ClinicType } from "@/types/clinic";
import RichTextRenderer from "@/components/rich-text-renderer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
type DoctorTexts = {
  badge: string;
  title: string;
  roleBadge: string;
  accordionTrigger: string;
  viewProfile: string;
};

type DoctorProps = {
  data: ClinicType["doctor"];
  doctorPageSlug?: string;
  texts: DoctorTexts;
};

export default function Doctor({ data, doctorPageSlug, texts }: DoctorProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section id="doctora" className="section bg-accent/50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen del doctor */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 left-20 right-20 sm:left-0 sm:right-0 translate-x-4 translate-y-4 rounded-2xl bg-primary/10" />
              <Image
                src={data.image?.url || "/placeholder-image.webp"}
                alt={data.name}
                width={600}
                height={800}
                className="relative z-10 w-1/2 sm:w-full rounded-2xl doctor-image object-cover mx-auto"
              />
            </div>
            <div className="mt-8 flex flex-col gap-4 px-6 sm:px-0">
              <Badge className="bg-primary/10 text-primary border-primary/20 w-fit text-xs font-semibold uppercase tracking-wider">
                {texts.roleBadge}
              </Badge>

              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={data.image?.url} alt={data.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {doctorPageSlug ? (
                    <Link
                      href={`/doctor/${doctorPageSlug}`}
                      className="text-2xl sm:text-3xl font-bold hover:text-primary transition-colors"
                    >
                      {data.name}
                    </Link>
                  ) : (
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {data.name}
                    </h3>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground text-base sm:text-lg">
                {data.description}
              </p>

              {doctorPageSlug && (
                <>
                  <Separator />
                  <Button variant="link" className="w-fit p-0 h-auto" asChild>
                    <Link href={`/doctor/${doctorPageSlug}`}>
                      {texts.viewProfile}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Credenciales / Rich text */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="border-l-4 border-l-primary p-6 space-y-4 text-sm sm:text-base">
              {/* Desktop: mostrar todo */}
              <div className="hidden md:block">
                <RichTextRenderer content={data.points} />
              </div>

              {/* Mobile: accordion colapsable */}
              <div className="md:hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value="credentials" className="border-b-0">
                    <AccordionTrigger className="text-base font-semibold hover:no-underline">
                      {texts.accordionTrigger}
                    </AccordionTrigger>
                    <AccordionContent>
                      <RichTextRenderer content={data.points} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
