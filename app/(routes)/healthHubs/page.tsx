"use client";

import { ResponseType } from "@/types/response";
import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import Contact from "./components/contact";
import HealthHubsPage from "./components/healthHubsPage";
import Testimonials from "./components/testimonal";

export default function Page() {
  return (
    <div>
        <HealthHubsPage/>
        <Testimonials/>
        <Contact/>
      </div>
  );
}
