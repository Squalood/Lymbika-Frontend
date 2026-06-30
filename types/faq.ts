export type FaqItemType = {
  id: number;
  question: string;
  answer: string;
};

export type FaqType = {
  id: number;
  nameFaq: string;
  title: string;
  descripction: string;
  slug: string;
  faq: FaqItemType[];
  medical_service?: { id: number; name: string; slug: string } | null;
};