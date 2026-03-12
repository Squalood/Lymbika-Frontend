export type FaqType = {
  id: number;
  nameFaq: string; 
  title: string; 
  descripction: string; 
  slug: string; 
  faq: {
    id: number;
    question: string;
    answer: string; 
  }[];
};