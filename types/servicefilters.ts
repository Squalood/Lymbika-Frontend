export type ServiceFilterTypes ={
    result: ResultServiceFilterTypes | null;
    loading: boolean;
    error: string;
};

export type ResultServiceFilterTypes = {
    schema: {
        attributes:{
            serviceName:{
                type:string;
            };
        };
    };
};