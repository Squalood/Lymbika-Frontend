"use client"

import Surgery from "./components/surgery";
import SurgeryFaq from "./components/surgeryFaq";

export default function Page (){

    return(  
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <Surgery/>
            <SurgeryFaq/>
        </div>
    );
}
