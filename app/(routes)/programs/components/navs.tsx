import es from "@/locals/es.json"
import Image from 'next/image'

const Programs = () => {
  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">{es.programsNavs.title}</h2>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-4">
        {es.programsNavs.cards.map((card, index) => (
          card.type === 'background' ? (
            <a
              key={index}
              href={card.link}
              className="group relative flex flex-col w-full bg-cover bg-center rounded-xl hover:shadow-lg transition col-span-2 p-4"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <div className="flex-auto p-8 md:p-6 text-white/90">
                <h3 className="text-xl  group-hover:text-white">
                {card.titleBold}
                </h3>
                <span className="font-bold">{card.titleRest}</span> 
              </div>
              <div className="pt-0 p-4 md:p-6">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70">
                  {card.cta}
                  <svg className="shrink-0 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            </a>
          ) : (
            <a key={index} href={card.link} className="group flex flex-col focus:outline-hidden">
                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                    <Image
                        src={card.image}
                        alt="imagen"
                        fill
                        className="object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>
              <div className="mt-3">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">{card.title}</h3>
                <p className="mt-1 text-gray-800">{card.description}</p>
                <p className="mt-2 inline-flex items-center gap-x-1 text-sm text-blue-600 group-hover:underline font-medium">
                  {card.cta}
                  <svg className="shrink-0 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </p>
              </div>
            </a>
          )
        ))}
      </div>
    </div>
  );
};

export default Programs;
