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
  scheduleLink: string;
  icon: string;

  services: {  
    id: number;
    title: string;
    description: string;
    price: number;
    icon: string; 
    image: {
      url: string;
    }; 
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
    mapsEmbedUrl: string;
  };

  gallery: {
    id: number;
    url: string;
  }[];
  videos: {
    id: number;
    videoID: string;
  }[];

  products: {
    id: number;
    productName: string;
    slug: string;
  };

  featuredClinic: boolean;

  doctorPage: {
    id: number;
    doctorName: string;
    slug: string;
  };
};