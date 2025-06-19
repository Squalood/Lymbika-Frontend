import es from "@/locals/es.json"
import { Brain, ChevronRight, HeartPulse, ScanHeart, Stethoscope } from "lucide-react";
import Link from "next/link";

const iconMap = {
  HeartPulse: <HeartPulse size={48} color="#1dd73c" className="transition-transform duration-500 ease-in-out group-hover:scale-150"/>,
  Stethoscope: <Stethoscope size={48} color="#eed453" className="transition-transform duration-500 ease-in-out group-hover:scale-150"/>,
  ScanHeart: <ScanHeart size={48} color="#df5ddb" className="transition-transform duration-500 ease-in-out group-hover:scale-150"/>,
  Brain: <Brain size={48} color="#3c24f5" className="transition-transform duration-500 ease-in-out group-hover:scale-150"/>
};

const Programs = () => {
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-0 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mb-10 lg:mb-14">
        <h2 className="text-2xl md:text-4xl md:leading-tight">
          {es.programsNavs.title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-4">
        {es.programsNavs.cards.map((card, index) => {
          const isBg = card.type === "background";
          return (
            <Link
              key={index}
              href={card.link}
              className={`group relative flex flex-col rounded-xl transition-all duration-500 ease-in-out
                ${isBg
                  ? "bg-cover bg-center text-white flex-[1_1_60%] sm:flex-[1_1_40%] sm:hover:flex-[2_1_58%] h-44 md:h-60 "
                  : "bg-muted h-40 text-gray-800 flex-[1_1_45%] sm:flex-[1_1_20%] overflow-hidden"
                }`}
              style={isBg ? { backgroundImage: `url(${card.image})` } : {}}
            >
              {isBg ? (
                <>
                  <div className="flex-auto p-8 pb-0 md:p-6 text-white/90">
                    <h3 className="text-base md:text-xl group-hover:text-white">
                      {card.titleBold}
                    </h3>
                    <span className="font-bold">{card.titleRest}</span>
                  </div>
                  <div className="p-4 pt-0 md:p-6">
                    <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium group-hover:text-white/70">
                      {card.cta}
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-end h-full w-full p-4">
                  <div className="flex flex-col gap-1">
                    {iconMap[card.icon as keyof typeof iconMap]}
                    <h3 className="text-lg font-semibold group-hover:text-gray-600">
                      {card.title}
                    </h3>
                    <span className="text-gray-500">{card.cost}</span>
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;