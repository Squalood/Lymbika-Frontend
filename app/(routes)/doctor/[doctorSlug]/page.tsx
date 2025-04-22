"use client";

import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import DoctorTop from "./components/doctor-top";
import { Separator } from "@/components/ui/separator";
import DoctorAbout from "./components/doctor-about";
import CalendarAvailability from "./components/doctor-schedule";
import SkeletonDoctor from "@/components/skeleton/doctorSkeletor";
import { useState } from "react";
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

export default function Page() {
  const params = useParams();
  const { doctorSlug } = params;
  const { loading, result }: ResponseType = useGetDoctorBySlug(doctorSlug ?? "");

  const doctor = result && result.length > 0 ? result[0] : null;

  const [activeTab, setActiveTab] = useState<"about" | "calendar" | "prices">("about");

  if (loading || !doctor) {
    return (
      <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
        <SkeletonDoctor />
      </div>
    );
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
      <DoctorTop doctor={doctor} />
      <Separator className="my-6" />

      {/* Mobile Select */}
      <div className="block lg:hidden max-w-xs mb-6">
        <Select value={activeTab} onValueChange={(value) => setActiveTab(value as "about" | "calendar" | "prices")}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="about">Sobre el Doctor</SelectItem>
            <SelectItem value="calendar">Disponibilidad</SelectItem>
            <SelectItem value="prices">Precios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:flex bg-muted p-1 rounded-full w-fit mb-2 gap-1">
        {[
          { key: "about", label: "Sobre el Doctor" },
          { key: "calendar", label: "Disponibilidad" },
          { key: "prices", label: "Precios" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "about" | "calendar" | "prices")}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-full transition",
              activeTab === tab.key
                ? "bg-white text-black shadow"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

    {activeTab === "about" && <DoctorAbout doctor={doctor} />}
    {activeTab === "calendar" && <CalendarAvailability />}
    {activeTab === "prices" && <DoctorPrice doctor={doctor}/>}

    <Separator className="mt-6" />

    <DoctorReviews average={5} waitingTime={5} recommend={5} bedsideManner={5} visitAgain={5}/>

    </div>
  );
}
