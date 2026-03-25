export type LandingPageJson = {
  turistSection?: {
    label?: string;
    title?: string;
    videoId?: string;
    videoLabel?: string;
    quote?: string;
    description?: string;
    ceoName?: string;
    ceoRole?: string;
    ctaText?: string;
    ctaHref?: string;
  };
  areDoctorsSection?: {
    badge?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaHref?: string;
    perks?: string[];
    testimonial?: {
      quote: string;
      name: string;
      role: string;
    };
  };
  videosSection?: {
    title?: string;
  };
  alyusSection?: {
    badge?: string;
    label?: string;
    title?: string;
    description?: string;
    chatFooter?: string;
    ctaText?: string;
    ctaHref?: string;
    features?: {
      icon: string;
      title: string;
      desc: string;
    }[];
    messages?: {
      from: "ai" | "user";
      text: string;
    }[];
  };
};
