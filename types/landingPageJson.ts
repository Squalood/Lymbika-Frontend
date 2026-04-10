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

  // — Secciones de la ruta /healthHubs (slug: doctores) —
  doctoresHeroStats?: { value: string; label: string }[];
  doctoresSection1?: {
    stat?: { value?: string; text?: string; highlight?: string; rest?: string };
    badge?: string;
    title?: string;
    description?: string;
    cards?: { icon: string; title: string; description: string }[];
  };
  doctoresSection2?: {
    badge?: string;
    title?: string;
    description?: string;
    colRol?: string;
    colCost?: string;
    colLymbika?: string;
    rows?: { rol: string; cost: string; lymbika: string }[];
    totalLabel?: string;
    totalCost?: string;
    totalLymbika?: string;
    banner?: string;
  };
  doctoresSection3?: {
    badge?: string;
    title?: string;
    description?: string;
    departments?: { icon: string; name: string; items: string[] }[];
    notice?: string;
  };
  doctoresSection4?: {
    badge?: string;
    title?: string;
    steps?: { icon: string; title: string; description: string }[];
    testimonial?: { quote: string; author: string };
  };
  doctoresPlansSection?: {
    badge?: string;
    title?: string;
    description?: string;
    popularLabel?: string;
    commitment?: string;
    entryPlan?: {
      title?: string;
      description?: string;
      badges?: string[];
      disclaimer?: string;
      price?: string;
      priceUnit?: string;
      href?: string;
    };
  };
  doctoresFaqSection?: {
    badge?: string;
    title?: string;
    cardTitle?: string;
    cardSubtitle?: string;
    notice?: string;
  };
  doctoresCtaSection?: {
    title?: string;
    description?: string;
    primaryBtn?: { label: string; href: string };
    secondaryBtn?: { label: string; href: string };
  };
};
