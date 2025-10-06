import { RichTextNode } from "@/types/rich-text";

export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  descriptionPro: RichTextNode[]; 
  active: boolean;
  price: number;
  tipo: string;
  isFeatured: boolean;
  images: {
    id: number;
    url: string;
  }[];
  category: {
    id: number;
    categoryName: string;
    slug: string;
  };
  priceMember: number;
  sal: string;
  clinics: {
    id: number;
    title: string;
    slug: string;
  };
};