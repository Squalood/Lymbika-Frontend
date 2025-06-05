"use client";

import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import DoctorTop from "./components/doctor-top";
import { Separator } from "@/components/ui/separator";
import DoctorAbout from "./components/doctor-about";
import SkeletonDoctor from "@/components/skeleton/doctorSkeletor";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import DoctorPrice from "./components/doctor-price";
import DoctorReviews from "./components/doctor-reviews";
import DoctorGallery from "./components/doctor-gallery";
import { motion } from "framer-motion";
import SimpleSchedule from "./components/simpleSchedule";
import DoctorComment from "./components/doctor-Comment";
import { useGetDoctorReviews } from "@/api/useGetDoctorReviews";

export default function Page() {
  const params = useParams();
  const { doctorSlug } = params;
  const { loading, result }: ResponseType = useGetDoctorBySlug(doctorSlug ?? "");
  const { reviews } = useGetDoctorReviews(doctorSlug ?? "");

  const doctor = result && result.length > 0 ? result[0] : null;

  const [activeTab, setActiveTab] = useState<"about" | "calendar" | "prices" | "gallery">("about");

  useEffect(() => {
    if (!loading && doctor) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading, doctor]);

  if (loading || !doctor) {
    return (
      <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
        <SkeletonDoctor />
      </div>
    );
  }

  console.log(reviews);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
      <DoctorTop doctor={doctor} />
      <Separator className="my-6" />

      {/* Mobile Select */}
      <div className="block lg:hidden max-w-48 mb-6 ml-2">
        <Select value={activeTab} onValueChange={(value) => setActiveTab(value as "about" | "calendar" | "prices" | "gallery")}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="about">Sobre el Doctor</SelectItem>
            <SelectItem value="calendar">Disponibilidad</SelectItem>
            <SelectItem value="prices">Precios</SelectItem>
            <SelectItem value="gallery">Galeria</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div className="relative hidden lg:flex bg-muted p-1 rounded-full w-fit mb-2 gap-1">
        {[
          { key: "about", label: "Sobre el Doctor" },
          { key: "calendar", label: "Disponibilidad" },
          { key: "prices", label: "Precios" },
          { key: "gallery", label: "Galeria" },
        ].map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={clsx(
              "relative px-4 py-2 text-sm font-medium rounded-full transition z-10",
              isActive ? "text-black" : "text-muted-foreground"
            )}
          >
            {tab.label}

            {/* Animated background for active tab */}
            {isActive && (
              <motion.div
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute inset-0 bg-white shadow rounded-full z-[-1]"
              />
            )}
          </button>
        );
      })}
    </div>

      {activeTab === "about" && <DoctorAbout doctor={doctor} />}
      {activeTab === "calendar" && <SimpleSchedule doctor={doctor}/>}
      {activeTab === "prices" && <DoctorPrice doctor={doctor}/>}
      {activeTab === "gallery" && <DoctorGallery doctor={doctor}/>}

      <Separator className="mt-6" />

      <DoctorReviews reviews={reviews} />

    </div>
  );
}