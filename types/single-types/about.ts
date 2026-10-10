import { ContactComponent } from "@/types/contact";

export type AboutPageType = {
  mission_title: string;
  mission_description: string;
  vision_title: string;
  vision_description: string;
  values_title: string;
  value: {
    id: number;
    label: string;
    icon?: string;
  }[];
  contact: ContactComponent;
  hero_image: { url: string };
};
