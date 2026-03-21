"use client";

import { useGetServiceRatesByDoctor } from "@/api/useGetServiceRatesByDoctor";
import { formatPrice } from "@/lib/formatPrice";
import { DoctorType } from "@/types/doctor";
import { ServiceRateType } from "@/types/medicalService";
import { Clock } from "lucide-react";
import Image from "next/image";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const TYPE_LABELS: Record<string, string> = {
  consultation: "Consulta",
  procedure: "Procedimiento",
  surgery: "Cirugía",
};

const TYPE_COLORS: Record<string, string> = {
  consultation: "bg-blue-50 text-blue-700",
  procedure: "bg-purple-50 text-purple-700",
  surgery: "bg-rose-50 text-rose-700",
};

const TYPE_ORDER = ["consultation", "procedure", "surgery"];

const DoctorPrice = ({ doctor }: InfoDoctorProps) => {
  const { rates, loading } = useGetServiceRatesByDoctor(doctor.slug);

  if (loading) {
    return (
      <div className="mx-4 sm:mx-8 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-56" />
        ))}
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div className="mx-8 mt-4 text-center text-gray-500 py-8">
        No hay tarifas disponibles para este doctor.
      </div>
    );
  }

  const grouped = TYPE_ORDER.reduce<Record<string, ServiceRateType[]>>((acc, type) => {
    const group = rates.filter((r) => r.medical_service?.type === type);
    if (group.length > 0) acc[type] = group;
    return acc;
  }, {});

  return (
    <div className="mx-4 sm:mx-8 mt-4 space-y-8">
      {Object.entries(grouped).map(([type, group]) => (
        <div key={type}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {TYPE_LABELS[type] ?? type}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.map((rate) => (
              <div
                key={rate.id}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-40 bg-gray-100 shrink-0">
                  {rate.medical_service.image?.url ? (
                    <Image
                      src={rate.medical_service.image.url}
                      alt={rate.medical_service.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-gray-300">🩺</span>
                    </div>
                  )}
                  {/* Type badge */}
                  <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[type]}`}>
                    {TYPE_LABELS[type] ?? type}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 gap-1">
                  <p className="font-semibold text-gray-800 leading-snug">
                    {rate.medical_service.name}
                  </p>
                  {rate.notes && (
                    <p className="text-xs text-gray-400">{rate.notes}</p>
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorPrice;
