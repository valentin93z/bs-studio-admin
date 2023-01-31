import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInterface, } from "../../models/IInterface";

const initialState: IInterface = {
        mastersModal: "none",
        servicesModal: "none",
        contactsModal: "none",
        galleryModal: "none",
}

export const interfaceSlice = createSlice({
    name: 'interface',
    initialState,
    reducers: {
        setMastersModal(state, action: PayloadAction<'none' | 'edit' | 'new' | 'delete'>) {
            state.mastersModal = action.payload;
        },
        setServicesModal(state, action: PayloadAction<'none' | 'edit' | 'new' | 'delete'>) {
            state.servicesModal = action.payload;
        },
        setContactsModal(state, action: PayloadAction<'none' | 'edit'>) {
            state.contactsModal = action.payload;
        },
        setGalleryModal(state, action: PayloadAction<'none' | 'new' | 'delete'>) {
            state.galleryModal = action.payload;
        },
    },
});

export default interfaceSlice.reducer;