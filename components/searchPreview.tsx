import Image from "next/image";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { Stethoscope, Hospital } from "lucide-react";
import es from "@/locals/es.json"
import { ServiceIconType } from "@/types/service";
import { MedicalServiceType } from "@/types/medicalService";

const MEDICAL_SERVICE_TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consulta",
  procedure: "Procedimiento",
  study: "Estudio",
};

type Props = {
  type: "product" | "doctor" | "service" | "category" | "medicalService" | "clinic";
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  sal: string;
  icon?: ServiceIconType | string;
  medicalServiceType?: MedicalServiceType["type"];
  specialtySlug?: string;
};

const SearchPreview = ({ type, id, name, slug, imageUrl, sal, icon, medicalServiceType, specialtySlug }: Props) => {
  const { replace } = useRouter();

  const handleClick = () => {
    if (type === "medicalService") {
      replace(specialtySlug ? `/specialty/${specialtySlug}/${slug}` : `/specialty/${slug}`);
      return;
    }
    const basePath =
      type === "product" ? "/product/"
      : type === "doctor" ? "/doctor/"
      : type === "service" ? "/specialty/"
      : type === "clinic" ? "/clinics/"
      : "/category/";
    replace(`${basePath}${slug}`);
  };

  const imageClass = type === "product" ? "rounded-none" : "rounded-full";
  const isTextOnly = type === "category" || type === "medicalService";
  const hasIconPreview = type === "service" || type === "clinic";

  const typeLabel =
    type === "service" ? es.titleServices
    : type === "category" ? "Línea de productos"
    : type === "clinic" ? "Clínica Especializada"
    : type === "medicalService"
      ? `Servicio médico${medicalServiceType ? ` · ${MEDICAL_SERVICE_TYPE_LABELS[medicalServiceType]}` : ""}`
      : null;

  const fallbackIcon = type === "clinic" ? Hospital : Stethoscope;
  const ServiceIcon = icon ? (LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType) : fallbackIcon;

  return (
    <li
      key={`${type}-${id}`}
      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      {hasIconPreview ? (
        <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
          <ServiceIcon className="w-5 h-5 text-primary" />
        </div>
      ) : !isTextOnly && (
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={name}
          width={200}
          height={200}
          className={`w-10 h-10 object-cover ${imageClass}`}
        />
      )}
      <div className="flex flex-col">
        <span className="truncate max-w-[260px]">{name}</span>
        {typeLabel && (
          <span className="text-muted-foreground text-sm">
            {typeLabel}
          </span>
        )}
        {type === "product" && (
          <p className="text-xs text-slate-400 line-clamp-3">{sal}</p>
        )}
      </div>
    </li>
  );
};

export default SearchPreview;
