import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeMedia } from "@/types/single-types/home";

type HeroData = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  image?: HomeMedia | null;
};

type HeroProps = {
  data: HeroData | undefined;
};

const Hero = ({ data }: HeroProps) => {
  if (!data) return null;

  return (
    <div className="relative h-[450px] md:h-[600px] lg:h-[700px] bg-primary px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden flex items-center">
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

      <div className="relative px-4 z-10 lg:w-3/4 xl:w-2/4 mt-28">
        <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {data.title}
        </h1>
        <p className="text-blue-100 text-sm md:text-xl leading-snug mt-4 w-5/6 md:w-full">
          {data.description}
        </p>

        {data.buttonText && data.buttonUrl && (
          <div className="mt-6">
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary text-xs md:text-lg"
              asChild
            >
              <Link href={data.buttonUrl} target="_blank" rel="noopener noreferrer nofollow">
                {data.buttonText}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
