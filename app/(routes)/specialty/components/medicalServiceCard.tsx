"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { MedicalServiceType } from "@/types/medicalService";
import { formatPrice } from "@/lib/formatPrice";
import { formatUS } from "@/lib/formatPriceUS";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consulta",
  procedure: "Procedimiento",
  study: "Estudio",
};

const TYPE_COLORS: Record<MedicalServiceType["type"], string> = {
  consultation: "bg-blue-50 text-blue-700",
  procedure: "bg-purple-50 text-purple-700",
  study: "bg-rose-50 text-rose-700",
};

type Props = {
  service: MedicalServiceType;
  href: string;
  minPrice?: number;
  packageItems?: string[] | null;
};

const MedicalServiceCard = ({ service, href, minPrice, packageItems }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const hasPackageItems = !!packageItems && packageItems.length > 0;

  return (
    <Link
      href={href}
      className="flex flex-col h-full rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-40 bg-gray-100 shrink-0">
        {service.image?.url ? (
          <Image src={service.image.url} alt={service.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-gray-300">🩺</span>
          </div>
        )}
        {service.type && (
          <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[service.type] ?? "bg-gray-100 text-gray-600"}`}>
            {TYPE_LABELS[service.type] ?? service.type}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="font-semibold text-gray-800 leading-snug">{service.name}</p>
        {service.description && (
          <p className="text-xs text-gray-500 line-clamp-2">{service.description}</p>
        )}

        {hasPackageItems && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDetails((prev) => !prev);
              }}
              className="flex items-center gap-1 text-xs font-medium text-primary self-start mt-1"
            >
              {showDetails ? "Ocultar detalles" : "Ver detalles"}
              {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDetails && (
              <ul className="flex flex-col gap-1.5 mt-1">
                {packageItems!.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <div className="mt-auto pt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {minPrice !== undefined && (
              <>
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Desde</p>
                <p className="text-lg font-bold text-blue-700 leading-tight">{formatPrice(minPrice)}</p>
                <p className="text-[11px] text-gray-400">~{formatUS(minPrice)} USD</p>
              </>
            )}
          </div>
          <span className={cn(buttonVariants({ size: "sm" }), "w-full sm:w-auto shrink-0")}>Cotizar →</span>
        </div>
      </div>
    </Link>
  );
};

export default MedicalServiceCard;
