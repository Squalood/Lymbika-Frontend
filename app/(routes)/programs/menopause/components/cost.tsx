import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

const card = [
    {
        title: "Vip",
        price: 99,
        descript: "Everything you need for a growing business",
        p1: "10 users",
        p2: "Plan features",
        p3: "Product support",
    },
    {
        title: "Premiun",
        price: 49,
        descript: "Everything you need for a growing business",
        p1: "5 users",
        p2: "Plan features",
        p3: "Product support",
    },
    {
        title: "General",
        price: 24,
        descript: "Everything you need for a growing business",
        p1: "2 users",
        p2: "Plan features",
        p3: "Product support",
    }
]

const Cost = () => {
    return ( 
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">Pricing</h2>
                <p className="mt-1 text-gray-600">Whatever your status, our offers evolve according to your needs.</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center">
            {card.map((card, index) => (
                <div key={index} className="flex flex-col border border-gray-200 text-center rounded-xl p-8">
                    <h4 className="font-medium text-lg text-gray-800">{card.title}</h4>
                    <span className="mt-5 font-bold text-5xl text-gray-800">
                    {formatPrice(card.price)}
                    </span>
                    <p className="mt-2 text-sm text-gray-500">{card.descript}</p>
                    <ul className="mt-7 space-y-2.5 text-sm">
                        <li className="flex gap-x-2">
                        <Check size={20} color="#2819f5" strokeWidth={1.5} />
                        <span className="text-gray-800">
                        {card.p1}
                        </span>
                        </li>

                        <li className="flex gap-x-2">
                        <Check size={20} color="#2819f5" strokeWidth={1.5} />
                        <span className="text-gray-800">
                        {card.p2}
                        </span>
                        </li>

                        <li className="flex gap-x-2">
                        <Check size={20} color="#2819f5" strokeWidth={1.5} />
                        <span className="text-gray-800">
                        {card.p3}
                        </span>
                        </li>
                    </ul>
                    <Button variant={"outline"} className="my-4">Sign up</Button>
                </div>
            ))}
            </div>
        </div>
     );
}
 
export default Cost;