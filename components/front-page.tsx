import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageType } from "@/types/pages";

type HeroProps = {
  hero: PageType["hero"];
};

const Hero = ({ hero }: HeroProps) => {
  if (!hero) return null;

  return (
    <div className="relative h-[450px] md:h-[600px] lg:h-[700px] rounded-br-[5rem] bg-primary px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden flex items-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        {hero.image?.url && (
          <Image
            src={hero.image.url}
            alt={hero.title}
            fill
            className="object-cover opacity-25"
          />
        )}
      </div>

      {/* Contenido */}
      <div className="relative px-4 z-10 lg:w-3/4 xl:w-2/4 mt-28">
        <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {hero.title}
        </h1>
        <p className="text-blue-100 text-sm md:text-xl leading-snug mt-4 w-5/6 md:w-full">
          {hero.description}
        </p>

        {/* Botón CTA */}
        {hero.buttonText && hero.buttonUrl && (
          <div className="mt-6">
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary text-xs md:text-lg"
              asChild
            >
              <Link
                href={hero.buttonUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {hero.buttonText}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;