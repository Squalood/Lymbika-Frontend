"use client"

import { useGetPageContact } from "@/api/getPageContact";
import AboutPage from "./components/aboutPage";
import SlideImage from "./components/slideimage";
import LymbikaLocation from "./components/location";

export default function Page() {
  const { contact, loading } = useGetPageContact("about");

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <SlideImage />
      <AboutPage />
      <LymbikaLocation contact={contact} />
    </div>
  );
}