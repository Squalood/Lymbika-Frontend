/** Componente contact.contact de Strapi. Lo usan about-page, page y schedules-page. */
export type ContactComponent = {
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
