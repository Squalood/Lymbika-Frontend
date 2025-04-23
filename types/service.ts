export type ServiceType = {
    id: number;
    serviceName: string;
    slug: string;
    image: {
        url: string;
    };
    description: string;
    atePrimary: boolean;
};