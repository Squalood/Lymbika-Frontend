"use client";

import ServiceCatalog from "./components/serviceCatalog";
import ServiceInfo from "./components/serviceInfo";
import { Separator } from "@/components/ui/separator";
import ServiceTitle from "./components/serviceTitle";

export default function Page() {

  return (
    <div className="w-full py-4 mx-auto sm:py-16 sm:px-24">
      <ServiceTitle/>
      <ServiceInfo />
      <Separator />
      <ServiceCatalog />
    </div>
  );
}
