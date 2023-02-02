import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFile, IGallery } from "../../models/IGallery";

const initialState: IGallery = {
    gallery: [],
    selectedFiles: null,
}

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        setSelectedFiles(state, action: PayloadAction<FileList | null>) {
            state.selectedFiles = action.payload;
        },
        setGallery(state, action: PayloadAction<IFile[]>) {
            state.gallery = action.payload;
        },
    },
});

export default gallerySlice.reducer;