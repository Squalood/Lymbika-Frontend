import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type SpecialtyCardProps = {
  name: string;
  imageUrl?: string;
  href: string;
};

const SpecialtyCard = ({ name, imageUrl, href }: SpecialtyCardProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl text-gray-300">
            🩺
          </div>
        )}
      </div>
      <span className="flex-1 text-sm font-medium text-gray-800 leading-snug line-clamp-2">
        {name}
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
    </Link>
  );
};

export default SpecialtyCard;
