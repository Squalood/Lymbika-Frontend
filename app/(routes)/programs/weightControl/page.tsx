"use client"

import Cost from "./components/cost";
import Plan1 from "./components/plan1";
import Plan2 from "./components/plan2";
import Testimonials from "./components/testimonials";
import WeightControlPage from "./components/weightControlPage"

export default function Page (){

    return(    
        <div>
            <WeightControlPage/>
            <Testimonials/>
            <Plan1/>
            <Plan2/>
            <Cost/>
        </div>
    );
}