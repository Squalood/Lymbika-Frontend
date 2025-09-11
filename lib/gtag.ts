
export const GA_TRACKING_ID = "G-1CNJ3WPFKE";

// Para pageviews
export const pageview = (url: string) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Para eventos personalizados
type GtagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};