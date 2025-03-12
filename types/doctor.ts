export type DoctorType = {
    id: number;
    doctorName: string;
    slug: string;
    image: {
        id: number;
        url: string;
    }[];
    review: number;
    service: {
        id: number;
        serviceName: string;
        slug: string;
    };
    surgery: {
        id: number;
        surgeryName: string;
        slug: string;
    };
};