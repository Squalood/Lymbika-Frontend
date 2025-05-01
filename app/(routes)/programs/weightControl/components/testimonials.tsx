import { CircleUserRound } from "lucide-react";
import es from "@/locals/es.json";

const { testimonials } = es.WeightControlPage;

const Testimonials = () => {
  return (
    <div className="overflow-hidden">
      <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl w-3/4 lg:w-1/2 mb-6 sm:mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Client Testimonials
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="flex h-auto">
              <div className="flex flex-col bg-gray-100 rounded-xl">
                <div className="flex-auto p-4 md:p-6">
                  <p className="text-base italic md:text-lg text-gray-800">
                    &#34;{item.commenary}&quot;
                  </p>
                </div>
                <div className="p-4 bg-gray-300 rounded-b-xl md:px-7">
                  <div className="flex items-center gap-x-3">
                    <div className="shrink-0">
                      <CircleUserRound />
                    </div>
                    <div className="grow">
                      <p className="text-sm sm:text-base font-semibold text-gray-800">
                        {item.user}
                      </p>
                      <p className="text-xs text-gray-500">{item.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
