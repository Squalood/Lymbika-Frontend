"use client";

import ServiceCatalog from "./components/serviceCatalog";
import ServiceInfo from "./components/serviceInfo";
import ServiceTitle from "./components/serviceTitle";

export default function Page() {

  return (
    <div className="w-full py-4 mx-auto sm:py-16">
      <ServiceTitle/>
      <ServiceInfo />
      <ServiceCatalog />
    </div>
  );
}
