"use client";

import { useGetFaqGroups } from "@/api/getFaqGroups";
import Faq from "./components/faq";
import PlanSection from "./components/plansSection";

export default function Page() {
  const { loading, faqGroups, error } = useGetFaqGroups();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const membershipFaqGroup = faqGroups.find((group) => group.slug === "memberships");

  return (
    <div>
      <PlanSection />
      
      {membershipFaqGroup ? (
        <Faq faqGroup={membershipFaqGroup} />
      ) : (
        <div className="flex justify-center py-20">
          <p>No se encontraron preguntas frecuentes para este grupo.</p>
        </div>
      )}
    </div>
  );
}
