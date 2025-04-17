"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetDoctorsByCategory } from "@/api/getDoctorsByCategory";

const ServiceTitle = () => {
  const { serviceSlug } = useParams() as { serviceSlug: string };
  const { result, loading } = useGetDoctorsByCategory(serviceSlug, "service");

  const [serviceName, setServiceName] = useState("Cargando...");

  useEffect(() => {
    if (!loading && Array.isArray(result)) {
      for (const doctor of result) {
        const matched = doctor.services?.find((s) => s.slug === serviceSlug);
        if (matched) {
          setServiceName(matched.serviceName);
          break;
        }
      }
    }
  }, [loading, result, serviceSlug]);

  return (
    <h1 className="text-3xl font-medium mb-4">{serviceName}</h1>
  );
};

export default ServiceTitle;
