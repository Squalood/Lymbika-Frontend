import es from "@/locals/es.json";
import { MessageCirclePlus } from "lucide-react";

const Promo = () => {
  const { title, items } = es.NeuroterapiaPage.sectionPromo;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex flex-col items-center">
      <h1 className="text-2xl">{title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5"
          >
            <div className="flex justify-center items-center size-12 bg-linear-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
              <MessageCirclePlus />
            </div>

            <div className="mt-3">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
