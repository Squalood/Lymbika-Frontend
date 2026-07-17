export type CategoryIcon = "Tablets" | "HeartPulse" | "Syringe" | "Baby" | "Pill" | "Sparkles";

export type CategoryType = {
    id: number;
    categoryName: string;
    slug: string;
    mainImage: {
        url: string;
    };
    description: string;
    icon?: CategoryIcon;
};