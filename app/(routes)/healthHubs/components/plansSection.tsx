"use client";

import {
  Check,
  X,
  Star,
  CalendarClock,
  MoveRight,
  Mail,
  Phone,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageType } from "@/types/pages";
import { LandingPageJson } from "@/types/landingPageJson";
import { formatPrice } from "@/lib/formatPrice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const TRUST_STEPS = [
  {
    icon: Mail,
    title: "Confirmación inmediata",
    description:
      "Recibes un correo de confirmación en segundos con el detalle de tu plan y tu factura.",
  },
  {
    icon: Phone,
    title: "Te contactamos en menos de 24h",
    description:
      "Un asesor de Lymbika te escribe para coordinar tu onboarding y resolver cualquier duda.",
  },
  {
    icon: Rocket,
    title: "Día 1: acceso y configuración",
    description:
      "Activamos tu cuenta y agendamos una sesión para configurar la plataforma a tu medida.",
  },
];

type PlansProps = {
  data: PageType[];
  texts?: LandingPageJson["doctoresPlansSection"];
};

const PlansSection = ({ data, texts }: PlansProps) => {
  const planItems = data.flatMap((page) => page.plan ?? []);
  const [pendingLink, setPendingLink] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-8">
      <div className="space-y-3 mb-10">
        {texts?.badge && (
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            {texts.badge}
          </span>
        )}
        {texts?.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
            {texts.title}
          </h2>
        )}
        {texts?.description && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {texts.description}
          </p>
        )}
      </div>

      <div className="space-y-3 mb-10">
        {/* plan de entrada */}
        {texts?.entryPlan && (
          <div
            onClick={() => setPendingLink(texts.entryPlan?.href ?? "#")}
            className="mt-10 bg-[#0b1630] hover:bg-[#112045] transition-all duration-300 hover:scale-[1.02] rounded-2xl px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-6 group cursor-pointer"
          >
            <div className="flex-1 space-y-3">
              {texts.entryPlan.title && (
                <h3 className="text-white font-bold text-lg">
                  {texts.entryPlan.title}
                </h3>
              )}
              {texts.entryPlan.description && (
                <p className="text-white/60 text-sm">
                  {texts.entryPlan.description}
                </p>
              )}
              {texts.entryPlan.badges && (
                <div className="flex flex-wrap gap-2">
                  {texts.entryPlan.badges.map((b, i) => (
                    <span
                      key={i}
                      className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
              {texts.entryPlan.disclaimer && (
                <p className="text-white/40 text-xs">
                  {texts.entryPlan.disclaimer}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right flex items-center gap-2">
              {texts.entryPlan.price && (
                <span className="text-4xl font-extrabold text-white">
                  {texts.entryPlan.price}
                </span>
              )}
              {texts.entryPlan.priceUnit && (
                <span className="text-white/60 text-sm ml-1">
                  {texts.entryPlan.priceUnit}
                </span>
              )}
              <MoveRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-200 ml-2" />
            </div>
          </div>
        )}
      </div>

      {/* planes convencionales */}
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {planItems.slice(0, 3).map((paquete) => {
            const isProminent = !!paquete.prominent;
            return (
              <CarouselItem
                key={paquete.id ?? crypto.randomUUID()}
                className="basis-full md:basis-1/3"
              >
                <div className="rounded-2xl overflow-hidden h-full flex flex-col border bg-white shadow-sm">
                  <div
                    className={`px-6 pt-6 pb-5 space-y-4 ${isProminent ? "bg-primary" : "bg-[#0b1630]"}`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white">
                      {isProminent && (
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      )}
                      {isProminent ? (texts?.popularLabel ?? "") : paquete.name}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {paquete.name ?? "Sin nombre"}
                      </h3>
                      <p className="text-sm text-white/70 mt-1">
                        {paquete.description ?? ""}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">
                        {formatPrice(paquete.price) ?? "—"}
                      </span>
                      <span className="text-sm text-white/60">MXN/mes</span>
                    </div>
                  </div>

                  <div className="flex-1 px-6 py-5 space-y-3">
                    {paquete.plus?.map((item) =>
                      item?.text ? (
                        <div
                          key={item.id ?? crypto.randomUUID()}
                          className="flex items-start gap-2.5"
                        >
                          <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                          <p className="text-sm text-foreground">{item.text}</p>
                        </div>
                      ) : null,
                    )}
                    {paquete.less?.map((item) =>
                      item?.text ? (
                        <div
                          key={item.id ?? crypto.randomUUID()}
                          className="flex items-start gap-2.5"
                        >
                          <X className="w-4 h-4 mt-0.5 text-destructive shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                      ) : null,
                    )}
                  </div>

                  <div className="px-6 pb-6 pt-2 space-y-3">
                    {texts?.commitment && (
                      <div
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-muted-foreground ${isProminent ? "bg-primary/10" : "bg-muted/50"}`}
                      >
                        <CalendarClock className="w-4 h-4 shrink-0 text-primary" />
                        {texts.commitment}
                      </div>
                    )}
                    {paquete.link ? (
                      <Button
                        className="w-full gap-2"
                        variant={isProminent ? "default" : "outline"}
                        onClick={() => setPendingLink(paquete.link!)}
                      >
                        Empezar <MoveRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button disabled className="w-full" variant="outline">
                        No disponible
                      </Button>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-4 bg-white/80 hover:bg-white shadow-md" />
        <CarouselNext className="-right-4 bg-white/80 hover:bg-white shadow-md" />
      </Carousel>

      {/* Modal de confianza */}
      <Dialog
        open={!!pendingLink}
        onOpenChange={(open) => !open && setPendingLink(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              ¿Qué pasa después de pagar?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Antes de continuar, queremos que sepas exactamente qué esperar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {TRUST_STEPS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full gap-2 mt-2"
            onClick={() => {
              if (pendingLink)
                window.open(pendingLink, "_blank", "noopener,noreferrer");
              setPendingLink(null);
            }}
          >
            Ir a pago <MoveRight className="w-4 h-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlansSection;
