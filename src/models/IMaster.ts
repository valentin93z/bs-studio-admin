export interface IMaster {
    _id: string;
    firstName: string;
    lastName: string;
    status: 'active' | 'disable';
    quality: string;
    description?: string;
}

export interface IMasters {
    masters: IMaster[];
}