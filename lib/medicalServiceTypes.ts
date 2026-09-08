import { MedicalServiceType } from "@/types/medicalService";

export const TYPE_LABELS: Record<MedicalServiceType["type"], string> = {
  consultation: "Consultas",
  procedure: "Procedimientos",
  study: "Estudios",
};

export const TYPE_ORDER: MedicalServiceType["type"][] = ["consultation", "procedure", "study"];
