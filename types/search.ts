import { ServiceIconType } from "@/types/service";
import { MedicalServiceType } from "@/types/medicalService";

export type SearchableType =
  | "product"
  | "doctor"
  | "service"
  | "category"
  | "medicalService"
  | "clinic";

export type SearchableItem = {
  type: SearchableType;
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  sal: string;
  icon?: ServiceIconType | string;
  medicalServiceType?: MedicalServiceType["type"];
  specialtySlug?: string;
};
