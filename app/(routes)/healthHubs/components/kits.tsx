"use client";

import { BarChart3, Check, MoveRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageType } from "@/types/pages";
import { formatPrice } from "@/lib/formatPrice";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PlansProps = {
  data: PageType[];
};

const PricingPaquetes = ({ data }: PlansProps) => {
  const planItems = data.flatMap((page) => page.plan ?? []);

  return (
    <div className="w-full md:max-w-6xl mx-auto py-20 px-4 lg:py-20">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Paquetes</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Activa tu práctica médica con Lymbika
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Paquetes comerciales para posicionarte, captar pacientes y escalar tu consulta.
            </p>
          </div>
          {/* Carrusel de planes */}
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full pt-20"
          >
            <CarouselContent>
              {planItems.slice(0, 3).map((paquete) => (
                <CarouselItem
                  key={paquete.id ?? crypto.randomUUID()}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={`w-full rounded-md py-4 overflow-hidden relative transition-all duration-1000 ease-in-out
                    max-h-none
                    md:max-h-[520px] md:hover:max-h-[1000px] md:mb-14
                    ${paquete.prominent ? "shadow-2xl" : ""}`}
                >
                  {/* Fade en la parte inferior */}
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white pointer-events-none md:block hidden" />
  
                    <CardHeader>
                      <CardTitle>
                        <span className="flex flex-row gap-4 items-center font-normal">
                          {paquete.name ?? "Sin nombre"}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {paquete.description ?? "Sin descripción"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2 justify-center">
                        <p className="flex flex-row items-center justify-center gap-2 text-xl">
                          <span className="text-4xl">
                            {formatPrice(paquete.price) ?? "sin actualizar"}
                          </span>
                          <span className="text-sm text-muted-foreground">MXN</span>
                          
                        </p>
                        <p className="text-sm text-muted-foreground">+ IVA Incluido

                        </p>
                        <div className="flex flex-col gap-4 justify-start text-left pt-4">
                          {paquete.plus?.map((item) =>
                            item?.text ? (
                              <div
                                key={item.id ?? crypto.randomUUID()}
                                className="flex flex-row gap-4"
                              >
                                <Check className="w-4 h-4 mt-1 text-primary" />
                                <p className="max-w-56">{item.text}</p>
                              </div>
                            ) : null
                          )}
                          {paquete.less?.map((item) =>
                            item?.text ? (
                              <div
                                key={item.id ?? crypto.randomUUID()}
                                className="flex flex-row gap-4 text-muted-foreground"
                              >
                                <X className="w-4 h-4 mt-1 text-destructive" />
                                <p className="max-w-56">{item.text}</p>
                              </div>
                            ) : null
                          )}
                        </div>
                        {paquete.link ? (
                          <Button
                            asChild
                            className="gap-4"
                            variant={paquete.prominent ? "default" : "outline"}
                          >
                            <Link href={paquete.link}>
                              Empezar
                              <MoveRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        ) : (
                          <Button disabled className="gap-4" variant="outline">
                            No disponible
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Flechas */}
            <CarouselPrevious className="left-2 sm:-left-10 bg-white/80 hover:bg-white shadow-md rounded-full" />
            <CarouselNext className="right-2 sm:-right-10 bg-white/80 hover:bg-white shadow-md rounded-full" />
          </Carousel>
          {/* Bloque adicional */}
          <div className="mt-16 w-full flex justify-center">
            <div className="flex items-center gap-4 bg-muted/50 border border-muted-foreground/20 rounded-lg px-6 py-6 max-w-2xl text-left">
              <BarChart3 className="w-8 h-8 text-primary shrink-0" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold">
                  📊 Modelo de ingresos adicional
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">$100 MXN</span>{" "}
                  por cada paciente referido a otro médico de nuestra red.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPaquetes;