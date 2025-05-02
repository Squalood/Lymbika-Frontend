import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import es from "@/locals/es.json";

const plans = [
  es.MenopausePage.Plans.card1,
  es.MenopausePage.Plans.card2,
].map(plan => ({
  title: plan.title,
  price: plan.price,
  features: [plan.p1, plan.p2, plan.p3, plan.p4, plan.p5, plan.p6],
}));

const Plan1 = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-3xl md:leading-tight">
          {es.MenopausePage.Plans.title}
        </h2>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:items-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-200 text-center rounded-xl p-8"
          >
            <h4 className="font-medium text-lg text-gray-800">{plan.title}</h4>
            <div>
              <span className="mt-5 font-bold text-5xl text-gray-800">
              {formatPrice(plan.price)}
              </span>
              <span className="text-sm text-muted-foreground">/ mes</span>
            </div>
            <ul className="mt-7 space-y-2.5 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex gap-x-2">
                  <Check size={20} color="#2819f5" strokeWidth={1.5} />
                  <span className="text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="my-4">
              Sign up
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan1;
