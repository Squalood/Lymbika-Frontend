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

  pageTexts: {
    hero: {
      badge: string;
      scheduleButton: string;
      servicesButton: string;
      statsServices: string;
      statsTestimonials: string;
    };
    services: {
      badge: string;
      title: string;
      description: string;
      typeConsultation: string;
      typeProcedure: string;
      typeStudy: string;
      durationTooltip: string;
      scheduleButton: string;
    };
    whyUs: {
      badge: string;
      title: string;
    };
    doctor: {
      badge: string;
      title: string;
      roleBadge: string;
      accordionTrigger: string;
      viewProfile: string;
    };
    video: {
      badge: string;
      title: string;
    };
    testimonials: {
      badge: string;
      title: string;
      basedOn: string;
      reviewSingular: string;
      reviewPlural: string;
      reviewSuffix: string;
    };
    gallery: {
      badge: string;
      title: string;
      dialogTitle: string;
      noContent: string;
      videoBadge: string;
    };
    contact: {
      badge: string;
      title: string;
      infoTitle: string;
      addressLabel: string;
      scheduleLabel: string;
      scheduleButton: string;
      whatsappButton: string;
      fallbackCity: string;
    };
    breadcrumb: {
      home: string;
      clinics: string;
    };
    floatingCta: string;
    notFound: string;
    doctorNotFound: string;
  } | null;

  colorPage: "navy" | "pink" | "green" | "blue" | "red" | null;
};