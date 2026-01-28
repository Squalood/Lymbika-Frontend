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

  Contact: {
    title: string;
    direccionText: string;
    timeText: string;
    contactLocation: string;
    contactScheduleLink: string;
    contactPhone: string;
    contactWhatsappLink: string;
    image: {
      url: string;
    };
    description: string;
  };
  imagenRe1: {
    url: string;
  };

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
};