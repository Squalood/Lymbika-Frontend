"use client"

import SurgeryCatalog from "./components/surgeryCatalog";
import SurgeryTitle from "./components/surgeryTitle";
import SurgeryInfo from "./components/surgeryInfo";

export default function Page (){

    return(  
        <div className="w-full py-4 mx-auto sm:py-16">
            <SurgeryTitle/>
            <SurgeryInfo/>
            <SurgeryCatalog/>
        </div>
    );
}
