"use client";

import GalleryModal from "@/components/galleryModal";
import { DoctorType } from "@/types/doctor";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const DoctorGallery = ({ doctor }: InfoDoctorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryImages = doctor.gallery || [];

  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-5/6 sm:w-3/4 mx-auto sm:py-8">
      {galleryImages.length > 0 ? (
        galleryImages.map((image, index) => (
          <button
            key={image.id || index}
            className="group block relative aspect-square object-cover overflow-hidden rounded-lg"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.url}
              alt="Gallery image"
              fill
              className="object-cover bg-gray-100 rounded-lg"
            />
            <div className="absolute bottom-1 end-1 opacity-0 group-hover:opacity-100 transition">
              <div className="flex items-center gap-x-1 py-1 px-2 bg-white border border-gray-200 text-gray-800 rounded-lg">
                <Search size={12} strokeWidth={2} />
                <span className="text-xs">View</span>
              </div>
            </div>
          </button>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No hay imágenes disponibles.
        </div>
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