export interface IFile {
    _id: Object;
    filename: string;
    mimetype: string;
    size: number;
}

export interface IGallery {
    gallery: IFile[];
    selectedFiles: FileList | null;
}