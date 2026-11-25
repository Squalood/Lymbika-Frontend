"use client";

import SegmentedToggle from "@/components/segmented-toggle";

interface PlanToggleProps {
  isFamilyPlan: boolean;
  setIsFamilyPlan: (value: boolean) => void;
  personalLabel?: string;
  familyLabel?: string;
}

/** Persona / Familia. El diseño vive en SegmentedToggle (compartido con la página de producto). */
const PlanToggle = ({
  isFamilyPlan,
  setIsFamilyPlan,
  personalLabel = "Plan por Persona",
  familyLabel = "Plan por Familia",
}: PlanToggleProps) => (
  <SegmentedToggle
    options={[
      { value: "persona", label: personalLabel },
      { value: "familia", label: familyLabel },
    ]}
    value={isFamilyPlan ? "familia" : "persona"}
    onChange={(v) => setIsFamilyPlan(v === "familia")}
  />
);

export default PlanToggle;
