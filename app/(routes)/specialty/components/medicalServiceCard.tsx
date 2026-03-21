import Image from "next/image";
import Link from "next/link";
import { MedicalServiceType } from "@/types/medicalService";

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

type Props = {
  service: MedicalServiceType;
  href: string;
};

const MedicalServiceCard = ({ service, href }: Props) => (
  <Link
    href={href}
    className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
  >
    <div className="relative w-full h-40 bg-gray-100 shrink-0">
      {service.image?.url ? (
        <Image src={service.image.url} alt={service.name} fill className="object-cover" />
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
    <div className="p-4">
      <p className="font-semibold text-gray-800 leading-snug">{service.name}</p>
      {service.description && (
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{service.description}</p>
      )}
    </div>
  </Link>
);

export default MedicalServiceCard;
