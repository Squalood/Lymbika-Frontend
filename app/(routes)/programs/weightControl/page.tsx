"use client"

import { useState } from "react";
import Cost from "./components/cost";
import Plan1 from "./components/plan1";
import Plan2 from "./components/plan2";
import Testimonials from "./components/testimonials";
import WeightControlPage from "./components/weightControlPage"
import clsx from "clsx";

export default function Page (){
const [activeTab, setActiveTab] = useState<"opcion-1" | "opcion-2" | "prices">("opcion-1");

    return(    
        <div>
            <WeightControlPage/>
            <Testimonials/>
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-lg">Planes de Precios</h2>
                <div className="flex bg-muted p-1 rounded-full w-fit mb-2 gap-1">
                {[{ key: "opcion-1", label: "Opción 1" },{ key: "opcion-2", label: "Opción 2" },
                ].map((tab) => (
                    <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "opcion-1" | "opcion-2")}
                    className={clsx(
                        "px-4 py-2 text-sm font-medium rounded-full transition",
                        activeTab === tab.key
                        ? "bg-white text-black shadow"
                        : "text-muted-foreground"
                )}>
                    {tab.label}
                    </button>
                ))}
                </div>    
            </div>
            {activeTab === "opcion-1" && <Plan1/>}
            {activeTab === "opcion-2" && <Plan2/>}
            <Cost/>
        </div>
    );
}