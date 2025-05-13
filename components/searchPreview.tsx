import Image from "next/image";
import { useRouter } from "next/navigation";

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
      type === "product"
        ? "/product/"
        : type === "doctor"
        ? "/doctor/"
        : "/service/";
    replace(`${basePath}${slug}`);
  };

  const imageClass = type === "product" ? "rounded-none" : "rounded-full";

  return (
    <li
      key={`${type}-${id}`}
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={imageUrl || "/placeholder.png"}
        alt={name}
        width={200}
        height={200}
        className={`w-10 h-10 object-cover ${imageClass}`}
      />
      <span>{name}</span>
    </li>
  );
};

export default SearchPreview;