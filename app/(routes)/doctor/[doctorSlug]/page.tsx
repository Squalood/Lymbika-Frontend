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
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams();
  const { doctorSlug } = params;
  const { loading, result }: ResponseType = useGetDoctorBySlug(doctorSlug ?? "");

  const doctor = result && result.length > 0 ? result[0] : null;

  const [activeTab, setActiveTab] = useState<"about" | "calendar">("about");

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

      {/* Tabs de navegación */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === "about" ? "default" : "outline"}
          onClick={() => setActiveTab("about")}
        >
          Sobre el Doctor
        </Button>
        <Button
          variant={activeTab === "calendar" ? "default" : "outline"}
          onClick={() => setActiveTab("calendar")}
        >
          Disponibilidad
        </Button>
      </div>

      {/* Renderizado condicional según tab */}
      {activeTab === "about" && <DoctorAbout doctor={doctor} />}
      {activeTab === "calendar" && <CalendarAvailability />}

      <Separator className="mt-6" />
    </div>
  );
}
