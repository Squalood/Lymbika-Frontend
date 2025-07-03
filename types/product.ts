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
};

// Tipo para describir un nodo de rich text (formato Strapi v5)
export type RichTextNode = {
  type: string;
  children: Array<{
    text: string;
    type?: string;
    bold?: boolean;
  }>;
  format?: string; // Solo en listas
};
