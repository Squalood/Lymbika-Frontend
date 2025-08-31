export type PageType = {
    id: number;
    namePage: string;
    slug: string;
    
    promo: {
        id: number;
        title: string;
        image: {
            url: string;
        }; 
        link: string;
    }[];
}