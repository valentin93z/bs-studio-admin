export interface IMaster {
    _id: Object;
    firstName: string;
    lastName: string;
    status: string;
    quality: string;
    photoUrl?: string;
    description?: string;
}

export interface IMasters {
    masters: IMaster[];
    master: IMaster;
}