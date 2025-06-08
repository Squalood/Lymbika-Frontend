"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useGetDoctorBySlug } from "@/api/getDoctorBySlug";
import { ResponseType } from "@/types/response";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SkeletonDoctor from "@/components/skeleton/doctorSkeletor";

import DoctorTop from "./doctor-top";
import DoctorAbout from "./doctor-about";
import SimpleSchedule from "./simpleSchedule";
import DoctorPrice from "./doctor-price";
import DoctorGallery from "./doctor-gallery";

const TABS = [
  { key: "about", label: "Sobre el Doctor" },
  { key: "calendar", label: "Disponibilidad" },
  { key: "prices", label: "Precios" },
  { key: "gallery", label: "Galería" },
] as const;

const DoctorShow = () => {
  const { doctorSlug } = useParams();
  const slug = typeof doctorSlug === "string" ? doctorSlug : ""; // Aseguramos que sea string
  const { loading, result }: ResponseType = useGetDoctorBySlug(slug);
  const doctor = result && result.length > 0 ? result[0] : null;

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("about");

  useEffect(() => {
    if (!loading && doctor && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading, doctor]);

  if (!slug) {
    return <div className="text-center py-10">No se encontró el doctor.</div>;
  }

  if (loading || !doctor) {
    return (
      <div className="max-w-6xl py-4 mx-auto sm:py-20 sm:px-24">
        <SkeletonDoctor />
      </div>
    );
  }

  const renderTabContent = {
    about: <DoctorAbout doctor={doctor} />,
    calendar: <SimpleSchedule doctor={doctor} />,
    prices: <DoctorPrice doctor={doctor} />,
    gallery: <DoctorGallery doctor={doctor} />,
  }[activeTab];

  return (
    <div>
      <DoctorTop doctor={doctor} />
      <Separator className="my-6" />

      {/* Mobile Select */}
      <div className="block lg:hidden max-w-48 mb-6 ml-2">
        <Select value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            {TABS.map((tab) => (
              <SelectItem key={tab.key} value={tab.key}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div
        className="relative hidden lg:flex bg-muted p-1 rounded-full w-fit mb-2 gap-1"
        role="tablist"
        aria-label="Opciones de vista del doctor"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "relative px-4 py-2 text-sm font-medium rounded-full transition z-10",
                isActive ? "text-black" : "text-muted-foreground"
              )}
              role="tab"
              aria-selected={isActive}
            >
              {tab.label}
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

      {/* Tab content */}
      {renderTabContent}
    </div>
  );
};

export default DoctorShow;