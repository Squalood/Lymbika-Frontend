"use client";

import { Contact } from "./components/contact";
import { Doctor } from "./components/doctor";
import { Hero } from "./components/hero";
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { WhyUs } from "./components/whyUs";

export default function Page() {
  return (
    <div className="relative">
        <Hero/>
        <div className="max-w-4xl mx-4 md:mx-8 lg:mx-auto">
            <Services />
            <WhyUs />
            <Doctor />
            <Testimonials />
            <Contact />
        </div>  
    </div>
  );
}
