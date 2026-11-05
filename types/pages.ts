import { LandingPageJson } from "./landing-page-json";
import { ContactComponent } from "./contact";

export type PageType = {
  id: number;
  namePage: string;
  slug: string;

  hero: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    image: {
      url: string;
    };
  };

  promo: {
    id: number;
    title: string;
    image: {
      url: string;
    };
    link: string;
  }[];

  plan: {
    id: number;
    name: string;
    description: string;
    price: number;
    plus: {
      id: number;
      text: string;
    }[];
    less: {
      id: number;
      text: string;
    }[];
    prominent: boolean;
    link: string;
  }[];

  values: {
    id: number;
    title: string;
    description: string;
  }[];

  features: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];

  steps: {
    id: number;
    title: string;
    description: string;
    icon: string;
  }[];
  
  stats: {
    id: number;
    title: string;
    description: string;
    price: number;
    icon: string;
  }[];

  Contact: ContactComponent;
  imagenRe1: {
    url: string;
  };

  badge: {
    id: number,
    boldText: string;
    text: string;
    tag?: string;
  }[];

  videos: {
    id: number;
    title: string;
    videoID: string;
  }[];

  gallery: {
    id: number;
    title: string;
    images: {
      url: string;
    };
  }[];

  ModalPlan: {
    id: number;
    title: string;
    subtitle: string;
    ctaLabel: string;
    TrustStep: {
      id: number;
      icon: "Mail" | "Phone" | "Rocket";
      title: string;
      description: string;
    }[];
  }[];

  landingPageJson: LandingPageJson;
};