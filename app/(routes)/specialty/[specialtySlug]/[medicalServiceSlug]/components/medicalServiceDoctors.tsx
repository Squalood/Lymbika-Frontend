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

  const availableRates = rates.filter((rate: ServiceRateWithDoctorType) => rate.doctor != null);

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
      ) : availableRates.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-gray-500">Aún no hay doctores disponibles para esta especialidad.</p>
          <a
            href="https://wa.me/526561100446?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20un%20doctor%20para%20esta%20especialidad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-full transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Solicitar doctor para esta especialidad
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRates.map((rate: ServiceRateWithDoctorType) => (
            <Link
              key={rate.id}
              href={`/doctor/${rate.doctor.slug}`}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Banner */}
              <div className="relative w-full h-28 bg-gray-100 shrink-0">
                {rate.doctor.bannerImage?.url ? (
                  <Image
                    src={rate.doctor.bannerImage.url}
                    alt={rate.doctor.doctorName}
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
                  {rate.doctor.image?.[0]?.url ? (
                    <Image
                      src={rate.doctor.image[0].url}
                      alt={rate.doctor.doctorName}
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
                  <p className="font-semibold text-gray-800 leading-snug">{rate.doctor.doctorName}</p>
                  {rate.doctor.services?.map((s) => (
                    <p key={s.id} className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{s.serviceName}</span>
                    </p>
                  ))}
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalServiceDoctors;
