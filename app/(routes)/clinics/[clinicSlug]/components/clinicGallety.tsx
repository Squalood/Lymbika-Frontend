"use client";

import { ClinicType } from "@/types/clinic";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlayCircle, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
type GalleryTexts = {
  badge: string;
  title: string;
  dialogTitle: string;
  noContent: string;
  videoBadge: string;
};

export type InfoclinicProps = {
  clinic: ClinicType;
  texts: GalleryTexts;
};

const ClinicGallery = ({ clinic, texts }: InfoclinicProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryImages = clinic.gallery || [];
  const videos = clinic.videos || [];

  const allMedia = [
    ...galleryImages.map((image, index) => ({
      type: "image" as const,
      id: image.id,
      url: image.url,
      index,
    })),
    ...videos.map((video) => ({
      type: "video" as const,
      id: video.id,
      videoId: video.videoID,
    })),
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="section bg-background">
      <div ref={ref} className="max-w-4xl mx-auto px-4">
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

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {allMedia.length > 0 ? (
            allMedia.map((media) =>
              media.type === "image" ? (
                <button
                  key={`img-${media.id}`}
                  onClick={() => setSelectedIndex(media.index)}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <Image
                    src={media.url}
                    alt="Gallery image"
                    fill
                    className="object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                </button>
              ) : (
                <div
                  key={`vid-${media.id}`}
                  className="aspect-square relative rounded-xl overflow-hidden shadow-sm"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${media.videoId}`}
                    title={`Video de cl\u00ednica ${clinic.heroTitle}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0 gap-1">
                    <PlayCircle className="w-3 h-3" />
                    {texts.videoBadge}
                  </Badge>
                </div>
              )
            )
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              {texts.noContent}
            </div>
          )}
        </div>
      </div>

      {/* Dialog lightbox */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        <DialogContent className="max-w-4xl p-2 bg-black/95 border-0">
          <DialogTitle className="sr-only">{texts.dialogTitle}</DialogTitle>
          <Carousel
            opts={{ startIndex: selectedIndex ?? 0 }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((img, index) => (
                <CarouselItem
                  key={img.id}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={img.url}
                    alt={`Imagen ${index + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-lg object-contain max-h-[80vh] w-auto"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ClinicGallery;
