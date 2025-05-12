"use client"

import AboutPage from "./components/aboutPage";
import LymbikaLocation from "./components/location";
import SlideImage from "./components/slideimage";

export default function Page (){

    return(    
        <div>
            <SlideImage/>
            <AboutPage/>
            <LymbikaLocation/>
        </div>
    );
}
