import { Check, RefreshCcw, X } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import es from "@/locals/es.json";

const plans = [
  es.WeightControlPage.Plans.card3,
  es.WeightControlPage.Plans.card4,
].map(plan => ({
  title: plan.title,
  price: plan.price,
  p1:plan.p1,
  p2:plan.p2,
  p3:plan.p3,
  p3sub:plan.p3sub,
  p4:plan.p4,
  pX:plan.pX
}));

const Plan1 = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-tight">
          {es.WeightControlPage.Plans.title2}
        </h2>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:items-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-200 text-left rounded-xl p-8"
          >
            <h4 className="font-medium text-lg text-gray-800">{plan.title}</h4>
            <div>
              <span className="mt-5 font-bold text-5xl text-gray-800">
              {formatPrice(plan.price)}
              </span>
              <span className="text-sm text-muted-foreground">/ mes</span>
            </div>
            <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex gap-x-2">
                  <Check size={20} color="#2819f5" strokeWidth={1.5} />
                  <span className="text-gray-800">{plan.p1}</span>
                </li>
                <li className="flex gap-x-2">
                  <Check size={20} color="#2819f5" strokeWidth={1.5} />
                  <span className="text-gray-800">{plan.p2}</span>
                </li>
                <li className="flex gap-x-2 flex-row">
                  <Check size={20} color="#2819f5" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-gray-800">{plan.p3}</span>
                    <span className="text-muted-foreground">{plan.p3sub}</span>
                  </div>
                </li>
                <li className="flex gap-x-2">
                  <RefreshCcw size={20} color="#2819f5" strokeWidth={1.5} />
                  <span className="text-gray-800">{plan.p4}</span>
                </li>
                <li className="flex gap-x-2">
                  <X size={20} color="#f50f0f" strokeWidth={1.5} />
                  <span className="text-gray-800">{plan.pX}</span>
                </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan1;
