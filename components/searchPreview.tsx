import Image from "next/image";
import { useRouter } from "next/navigation";
import es from "@/locals/es.json"

type Props = {
  type: "product" | "doctor" | "service" | "surgery" | "category";
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
};

const SearchPreview = ({ type, id, name, slug, imageUrl }: Props) => {
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
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
        <span>{name}</span>
        {typeLabel && (
          <span className="text-muted-foreground text-xs">{typeLabel}</span>
        )}
      </div>
    </li>
  );
};

export default SearchPreview;
