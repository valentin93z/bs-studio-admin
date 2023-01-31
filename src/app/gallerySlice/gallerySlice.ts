import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IGallery } from "../../models/IGallery";

const initialState: IGallery = {
    gallery: null,
    selectedFiles: null,
}

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        setSelectedFiles(state, action: PayloadAction<FileList | null>) {
            state.selectedFiles = action.payload;
        },
    },
});

export default gallerySlice.reducer;