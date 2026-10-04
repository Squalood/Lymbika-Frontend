import Image from "next/image";
import { MedicalServiceType } from "@/types/medicalService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { imgUrl } from "@/lib/media";

export default function Gallery({ service }: { service: MedicalServiceType }) {
  const gallery = service.landing_gallery ?? [];
  const t = service.landingTexts;
  if (gallery.length === 0) return null;

  return (
    <section id="resultados" className="w-full py-4 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-primary">
          {t?.gallery_label ?? "Resultados"}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
          {t?.gallery_title ?? "Resultados reales"}
        </h2>
      </div>

      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {gallery.map((img, i) => (
            <CarouselItem key={i} className="basis-2/3 md:basis-1/3 lg:basis-1/4">
              <div className="rounded-xl overflow-hidden border" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={imgUrl(img.url)}
                  alt={`Resultado ${i + 1}`}
                  width={256}
                  height={340}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 bg-white/80 hover:bg-white shadow-md" />
        <CarouselNext className="-right-4 bg-white/80 hover:bg-white shadow-md" />
      </Carousel>
    </section>
  );
}
