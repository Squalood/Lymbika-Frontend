import Image from "next/image";
import { HomeMedia } from "@/types/single-types/home";
import HeroSearchBar from "@/components/hero-search-bar";

type HeroData = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: HomeMedia | null;
  searchPlaceholder?: string;
  searchButtonText?: string;
  searchSuggestions?: string[] | null;
};

type HeroProps = {
  data: HeroData | undefined;
};

const Hero = ({ data }: HeroProps) => {
  if (!data) return null;

  return (
    <div className="relative md:h-[600px] lg:h-[700px] bg-primary px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-x-clip flex items-center">
      <div className="absolute inset-0 z-0">
        {data.image?.url && (
          <Image
            src={data.image.url}
            alt={data.title ?? "Hero"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 object-[90%_50%] md:object-center"
          />
        )}
      </div>

      <div className="relative px-2 z-10 lg:w-3/4 xl:w-3/5 mt-52 mb-16">
        <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold leading-tight">
          {data.title}
        </h1>
        <p className="text-blue-100 text-sm md:text-xl leading-snug mt-4 w-5/6 md:w-full">
          {data.description}
        </p>
        <HeroSearchBar
          className="mt-6 max-w-2xl"
          placeholder={data.searchPlaceholder}
          buttonText={data.searchButtonText}
          suggestions={data.searchSuggestions ?? undefined}
        />
      </div>
    </div>
  );
};

export default Hero;
