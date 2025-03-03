export type ProductType = {
    id: number;
    productName: string;
    slug: string;
    description: string;
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
};
