import { Check, MoveRight } from "lucide-react";
import { MedicalServiceType } from "@/types/medicalService";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/contact-button";
import { WhatsAppCtaButton } from "@/components/whatsapp-cta-button";
import { getPackageItems } from "@/lib/packageItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { getWhatsAppUrl } from "@/lib/medicalServiceTypes";

export default function Package({ service }: { service: MedicalServiceType }) {
  const serviceRates = service.service_rates ?? [];
  const t = service.landingTexts;
  const packageRates = serviceRates.filter((r) => getPackageItems(r).length > 0);
  if (packageRates.length === 0) return null;

  return (
    <section id="package" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-primary">
          {t?.package_label_section ?? "Inversión"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {t?.package_title ?? "Todo incluido, sin sorpresas"}
        </h2>
      </div>

      <Carousel opts={{ align: "center", loop: false }} className="w-full relative">
        <CarouselContent className="-ml-4">
          {packageRates.map((rate, i) => {
            const packageItems = getPackageItems(rate);
            return (
            <CarouselItem key={rate.id ?? i} className="pl-4 basis-[88%] sm:basis-1/2 mx-auto">
              <div className="rounded-2xl overflow-hidden border bg-white shadow-sm flex flex-col h-full">
                {/* Header oscuro */}
                <div className="bg-[#0b1630] px-6 pt-6 pb-5 space-y-3">
                  {rate.package_label && (
                    <span className="inline-flex text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 text-white">
                      {rate.package_label}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {rate.doctor?.doctorName ?? service.name}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">
                      ${rate.price.toLocaleString("es-MX")}
                    </span>
                    <span className="text-sm text-white/60">MXN</span>
                  </div>
                </div>

                {/* Items incluidos */}
                {packageItems.length > 0 && (
                  <div className="flex-1 px-6 py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {packageItems.map((item, j) => (
                        <div key={j} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                          <p className="text-sm text-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nota y CTA */}
                <div className="px-6 pb-6 pt-2 space-y-3">
                  {rate.package_note && (
                    <p className="text-xs text-muted-foreground border-t pt-3">{rate.package_note}</p>
                  )}
                  {service.type === "procedure" ? (
                    <WhatsAppCtaButton
                      url={getWhatsAppUrl({
                        type: service.type,
                        name: service.name,
                        priceDisplay: `${formatPrice(rate.price, 0)} MXN`,
                        doctorName: rate.doctor?.doctorName,
                      })}
                      label={t?.package_cta_button ?? "Agendar valoración"}
                      className="w-full"
                    />
                  ) : rate.doctor?.contactButton ? (
                    <ContactButton contactButton={rate.doctor.contactButton} className="w-full" />
                  ) : (
                    <Button className="w-full gap-2" asChild>
                      <a href="#contacto">{t?.package_cta_button ?? "Agendar valoración"} <MoveRight className="w-4 h-4" /></a>
                    </Button>
                  )}
                </div>
              </div>
            </CarouselItem>
            );
          })}
        </CarouselContent>
        {packageRates.length > 1 && (
          <>
            <CarouselPrevious className="-left-4 md:-left-6" />
            <CarouselNext className="-right-4 md:-right-6" />
          </>
        )}
      </Carousel>
    </section>
  );
}
