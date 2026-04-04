import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ChevronRight, Stethoscope } from "lucide-react";
import { ServiceIconType } from "@/types/service";

type SpecialtyCardProps = {
  name: string;
  icon?: ServiceIconType;
  href: string;
};

const SpecialtyCard = ({ name, icon, href }: SpecialtyCardProps) => {
  const Icon = icon ? (LucideIcons[icon] as React.ElementType) : Stethoscope;

  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="flex-1 text-sm font-medium text-gray-800 leading-snug line-clamp-2">
        {name}
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
    </Link>
  );
};

export default SpecialtyCard;
