"use client"

import Cost from "./components/cost";
import Testimonials from "./components/testimonials";
import WeightControlPage from "./components/weightControlPage"

export default function Page (){

    return(    
        <div>
            <WeightControlPage/>
            <Testimonials/>
            <Cost/>
        </div>
    );
}