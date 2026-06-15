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
  contact: {
    title: string;
    direccionText: string;
    timeText: string;
    contactLocation: string;
    contactScheduleLink: string;
    contactPhone: string;
    contactWhatsappLink: string;
    image: { url: string };
    description: string;
  };
  hero_image: { url: string };
};
