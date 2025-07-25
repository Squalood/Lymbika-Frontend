import { RichTextNode } from "./rich-text";

export type ClinicType = {
  id: number;
  title: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: {
    url: string;
  };
  contactLocation: string;
  contactSchedule: string;
  contactPhone: string;
  contactWhatsappLink: string;

  services: {
    id: number;
    title: string;
    description: string;
    price: number;
    icon: string; 
  }[];

  features: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];

  testimonials: {
    id: number;
    name: string;
    text: string;
    rating: number;
  }[];

  doctor: {
    id: number;
    name: string;
    description: string;
    image: {
      url: string;
    }; 
    points: RichTextNode[];
  };
};