"use client";

import { useParams } from "next/navigation";
import { useGetServiceRatesByMedicalService } from "@/api/useGetServiceRatesByMedicalService";
import { ServiceRateWithDoctorType } from "@/types/medicalService";
import { formatPrice } from "@/lib/formatPrice";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const MedicalServiceDoctors = () => {
  const params = useParams();
  const medicalServiceSlug = typeof params.medicalServiceSlug === "string" ? params.medicalServiceSlug : "";

  const { rates, loading, error } = useGetServiceRatesByMedicalService(medicalServiceSlug);

  return (
    <div>
      <h2 className="text-2xl font-medium mb-2">Doctores disponibles</h2>
      <Separator className="mb-6" />

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-56" />
          ))}
        </div>
      ) : rates.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No hay doctores disponibles para este servicio.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rates.map((rate: ServiceRateWithDoctorType) => (
            <Link
              key={rate.id}
              href={`/doctor/${rate.doctor.slug}`}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Doctor image */}
              <div className="relative w-full h-44 bg-gray-100 shrink-0">
                {rate.doctor.image?.[0]?.url ? (
                  <Image
                    src={rate.doctor.image[0].url}
                    alt={rate.doctor.doctorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl text-gray-300">👨‍⚕️</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-1">
                <p className="font-semibold text-gray-800 leading-snug">{rate.doctor.doctorName}</p>
                {rate.doctor.clinic && (
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {rate.doctor.clinic.title}
                  </p>
                )}
                {rate.notes && (
                  <p className="text-xs text-gray-400 mt-0.5">{rate.notes}</p>
                )}
                <div className="flex items-center justify-between mt-auto pt-3">
                  {rate.duration_min ? (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {rate.duration_min} min
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-base font-bold text-blue-700">
                    {formatPrice(rate.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalServiceDoctors;
