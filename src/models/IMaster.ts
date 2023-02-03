export interface IMaster {
    _id: Object;
    firstName: string;
    lastName: string;
    status: string;
    quality: string;
    photo: {
        selectedFile?: FileList | null;
        filename: string;
        mimetype: string;
        size: number;
    }
    description?: string;
}

export interface IMasters {
    masters: IMaster[];
    master: IMaster;
}