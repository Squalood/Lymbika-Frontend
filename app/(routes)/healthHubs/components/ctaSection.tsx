import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LandingPageJson } from "@/types/landingPageJson";

type Props = { data?: LandingPageJson["doctoresCtaSection"] };

const CTASection = ({ data }: Props) => {
  if (!data) return null;

  return (
    <section className="py-10 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="bg-primary rounded-2xl px-8 py-12 flex flex-col items-center text-center space-y-6">
        {data.title && <h2 className="text-2xl md:text-3xl font-bold text-white">{data.title}</h2>}
        {data.description && <p className="text-white/80 text-sm md:text-base max-w-xl">{data.description}</p>}
        <div className="flex flex-col sm:flex-row gap-3">
          {data.primaryBtn && (
            <Button asChild className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Link href={data.primaryBtn.href} target="_blank" rel="noopener noreferrer">
                {data.primaryBtn.label} <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          )}
          {data.secondaryBtn && (
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white bg-transparent font-semibold">
              <Link href={data.secondaryBtn.href} target="_blank" rel="noopener noreferrer">
                {data.secondaryBtn.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
