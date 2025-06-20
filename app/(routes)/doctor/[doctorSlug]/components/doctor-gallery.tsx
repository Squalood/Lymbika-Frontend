"use client";

import GalleryModal from "@/components/galleryModal";
import { DoctorType } from "@/types/doctor";
import { Search, PlayCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const DoctorGallery = ({ doctor }: InfoDoctorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryImages = doctor.gallery || [];
  const videos = doctor.videos || [];

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

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-5/6 sm:w-3/4 mx-auto sm:py-8">
        {allMedia.length > 0 ? (
          allMedia.map((media, i) =>
            media.type === "image" ? (
              <button
                key={`img-${media.id}`}
                onClick={() => setSelectedIndex(media.index)}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={media.url}
                  alt="Gallery image"
                  fill
                  className="object-cover bg-gray-100"
                />
                <div className="absolute bottom-1 end-1 opacity-0 group-hover:opacity-100 transition">
                  <div className="flex items-center gap-1 py-1 px-2 bg-white border border-gray-200 text-gray-800 rounded-lg">
                    <Search size={12} />
                    <span className="text-xs">Ver</span>
                  </div>
                </div>
              </button>
            ) : (
              <div key={`vid-${media.id}`} className="aspect-square relative rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${media.videoId}`}
                  title={`Video del doctor ${doctor.doctorName}`}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-1 end-1 opacity-80 bg-black text-white text-xs px-2 py-1 rounded">
                  <PlayCircle size={12} className="inline-block mr-1" />
                  Video
                </div>
              </div>
            )
          )
        ) : (
          <div className="col-span-full text-center text-gray-500">No hay contenido disponible.</div>
        )}
      </div>

      {selectedIndex !== null && (
        <GalleryModal
          images={galleryImages}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};

export default DoctorGallery;