export type FaqType = {
  id: number;
  title: string; 
  slug: string; 
  faq: {
    id: number;
    question: string;
    answer: string; 
  }[];
};