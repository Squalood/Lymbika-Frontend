import Image from "next/image";
import { useRouter } from "next/navigation";
import es from "@/locals/es.json"

type Props = {
  type: "product" | "doctor" | "service" | "surgery" | "category";
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  sal: string;
};

const SearchPreview = ({ type, id, name, slug, imageUrl, sal }: Props) => {
  const { replace } = useRouter();

  const handleClick = () => {
    const basePath =
      type === "product" ? "/product/"
      : type === "doctor" ? "/doctor/"
      : type === "service" ? "/service/"
      : type === "surgery" ? "/surgery/"
      : "/category/";
    replace(`${basePath}${slug}`);
  };

  const imageClass = type === "product" ? "rounded-none" : "rounded-full";
  const isTextOnly = type === "service" || type === "surgery" || type === "category";

  const typeLabel =
    type === "service" ? es.titleServices
    : type === "surgery" ? es.titlesurgery
    : type === "category" ? "Línea de productos"
      : null;

  return (
    <li
      key={`${type}-${id}`}
      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      {!isTextOnly && (
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
