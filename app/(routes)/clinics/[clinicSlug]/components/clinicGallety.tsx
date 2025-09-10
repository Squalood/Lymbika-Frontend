"use client";

import GalleryModal from "@/components/galleryModal";
import { ClinicType } from "@/types/clinic";
import { Search, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export type InfoclinicProps = {
  clinic: ClinicType;
};

const ClinicGallery = ({ clinic }: InfoclinicProps) => {
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
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div ref={ref}>
        <h2
          className={`text-3xl font-semibold mb-6 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Galería
        </h2>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 gap-2 w-5/6 sm:w-3/4 mx-auto sm:py-8 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {allMedia.length > 0 ? (
            allMedia.map((media) =>
              media.type === "image" ? (
                <button
                  key={`img-${media.id}`}
                  onClick={() => setSelectedIndex(media.index)}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <Image
                    src={media.url}
                    alt="Gallery image"
                    fill
                    className="object-cover bg-gray-100"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <div className="flex items-center gap-1 py-1 px-2 bg-white/90 border border-gray-200 text-gray-800 rounded-lg shadow-sm">
                      <Search size={12} />
                      <span className="text-xs">Ver</span>
                    </div>
                  </div>
                </button>
              ) : (
                <div
                  key={`vid-${media.id}`}
                  className="aspect-square relative rounded-lg overflow-hidden shadow-sm"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${media.videoId}`}
                    title={`Video de clínica ${clinic.heroTitle}`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <PlayCircle size={12} />
                    Video
                  </div>
                </div>
              )
            )
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No hay contenido disponible.
            </div>
          )}
        </div>
      </div>

      {selectedIndex !== null && (
        <GalleryModal
          images={galleryImages}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
};

export default ClinicGallery;