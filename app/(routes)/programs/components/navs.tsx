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
        <h2 className="text-2xl md:text-4xl md:leading-tight">{es.programsNavs.title}</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {es.programsNavs.cards.map((card, index) => (
          card.type === 'background' ? (
            <Link
              key={index}
              href={card.link}
              className="group relative flex flex-col bg-cover bg-center rounded-xl p-4 transition-all duration-500 ease-in-out flex-[1_1_60%] hover:flex-[1_1_60%] sm:flex-[1_1_40%] sm:hover:flex-[2_1_50%]"
              style={{ backgroundImage: `url(${card.image})`, minHeight: "200px" }}
            >
              <div className="flex-auto p-8 md:p-6 text-white/90">
                <h3 className="text-xl group-hover:text-white">
                  {card.titleBold}
                </h3>
                <span className="font-bold">{card.titleRest}</span>
              </div>
              <div className="pt-0 p-4 md:p-6">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70">
                  {card.cta}
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ) : (
            <Link
              key={index}
              href={card.link}
              className="group flex flex-[1_1_45%] sm:flex-[1_1_20%] rounded-xl overflow-hidden bg-muted h-40 p-4"
            >
              <div className="flex flex-col justify-end h-full w-full">
                <div className="flex flex-col gap-1">
                  {iconMap[card.icon as keyof typeof iconMap]}
                  <h3 className="text-lg sm:text-lg font-semibold text-gray-800 group-hover:text-gray-600">
                    {card.title}
                  </h3>
                  <span className="text-gray-500">{card.cost}</span>
                </div>
              </div>
            </Link>

          )
        ))}
      </div>
    </div>
  );
};

export default Programs;
