export type DoctorType = {
    id: number;
    doctorName: string;
    slug: string;
    image: {
      id: number;
      url: string;
    }[];
    review: number;
    services: {
      id: number;
      serviceName: string;
      slug: string;
    }[];
    surgeries: {
      id: number;
      surgeryName: string;
      slug: string;
    }[];
    about: string;
    languagesSpoken: string;
    location: string;
    bannerImage: {
      url: string;
    };
    priceCon: number | null;
    facebook: string;
    instagram: string;
    tiktok: string;
    web: string;
    gallery: {
      id: number;
      url: string;
    }[];
  };
  