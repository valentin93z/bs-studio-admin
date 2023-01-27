export interface IService {
    _id: Object;
    title: string;
    price: string;
    type: string;
    status: string;
    description?: string;
}

export interface IServices {
    services: IService[];
    service: IService;
}