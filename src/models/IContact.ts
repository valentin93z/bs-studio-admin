export interface IAddress {
    city: string;
    street: string;
    house: string;
}

export interface ISocial {
    instagram: string;
    telegram: string;
    vk: string;
    whatsapp: string;
    viber: string;
}

export interface IContact {
    _id: Object;
    address: IAddress;
    schedule: string;
    phone: string;
    social: ISocial;
}