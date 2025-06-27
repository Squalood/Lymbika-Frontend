export type MembershipType = {
  id: number;
  name: string;
  icon: string; 
  priceP: number;
  priceF: number;
  description: string;
  button: {
    label: string;
    icon: string; 
    variant: "default" | "outline";
    linkP?: string;
    linkF?: string;
    link?: string;
  };
  features: {
    title: string;
  }[];
};