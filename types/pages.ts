export type PageType = {
    id: number;
    namePage: string;
    slug: string;

    hero:{
        title: string;
        description: string;
        buttonText: string;  
        buttonUrl: string;
        image: {
            url: string;
        };
    } 	
    
    promo: {
        id: number;
        title: string;
        image: {
            url: string;
        }; 
        link: string;
    }[];

    plan: {
        id: number;
        name: string;
        description: string;
        price: number; 
        plus: {
            id: number;
            text: string;
        }[];
        less: {
            id: number;
            text: string;
        }[];
        prominent: boolean;
        link: string;
    }[];
}