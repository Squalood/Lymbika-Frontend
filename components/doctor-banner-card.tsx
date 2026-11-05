import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { DoctorType } from "@/types/doctor";
import { formatPrice } from "@/lib/format-price";

type DoctorBannerCardProps = {
  doctor: Pick<DoctorType, "slug" | "doctorName" | "bannerImage" | "image" | "services">;
  /** Precio de la tarifa; sin precio no se muestra la fila inferior. */
  price?: number | null;
  durationMin?: number | null;
  notes?: string | null;
};

/**
 * Tarjeta de doctor con banner y avatar encimado que lleva a su perfil.
 * Distinta de las CardDoctor de /doctor y /doctor-catalog, que tienen otro diseño.
 */
export function DoctorBannerCard({ doctor, price, durationMin, notes }: DoctorBannerCardProps) {
  const avatarUrl = doctor.image?.[0]?.url;
  const hasFooter = price != null || !!durationMin;

  return (
    <Link
      href={`/doctor/${doctor.slug}`}
      className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Banner */}
      <div className="relative w-full h-28 bg-gray-100 shrink-0">
        {doctor.bannerImage?.url ? (
          <Image
            src={doctor.bannerImage.url}
            alt={doctor.doctorName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200" />
        )}
      </div>

      {/* Avatar overlapping banner */}
      <div className="relative px-4">
        <div className="absolute -top-8 left-4 w-16 h-16 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-sm">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={doctor.doctorName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">
              👨‍⚕️
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col pt-10 pb-4 gap-1">
          <p className="font-semibold text-gray-800 leading-snug">{doctor.doctorName}</p>
          {doctor.services?.map((s) => (
            <p key={s.id} className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{s.serviceName}</span>
            </p>
          ))}
          {notes && (
            <p className="text-xs text-gray-400 mt-0.5">{notes}</p>
          )}
          {hasFooter && (
            <div className="flex items-center justify-between mt-auto pt-3">
              {durationMin ? (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {durationMin} min
                </span>
              ) : (
                <span />
              )}
              {price != null && (
                <span className="text-base font-bold text-blue-700">
                  {formatPrice(price)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
