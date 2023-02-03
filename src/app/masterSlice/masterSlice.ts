import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMaster, IMasters } from "../../models/IMaster";

const initialState: IMasters = {
    masters: [],
    master: {
        _id: {},
        firstName: '',
        lastName: '',
        status: 'active',
        quality: '',
        photo: {
            selectedFile: null,
            filename: '',
            mimetype: '',
            size: 0,
        },
        description: '',
    }
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setMasters(state, action: PayloadAction<IMaster[]>) {
            state.masters = action.payload;
        },
        setFirstName(state, action: PayloadAction<string>) {
            state.master.firstName = action.payload;
        },
        setLastName(state, action: PayloadAction<string>) {
            state.master.lastName = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
            state.master.status = action.payload;
        },
        setQuality(state, action: PayloadAction<string>) {
            state.master.quality = action.payload;
        },
        setSelectedFile(state, action: PayloadAction<FileList | null>) {
            state.master.photo.selectedFile = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
            state.master.description = action.payload;
        },
        setReset(state) {
            state.master.firstName = '';
            state.master.lastName = '';
            state.master.status = 'active';
            state.master.quality = '';
            state.master.photo.selectedFile = null;
            state.master.photo.filename = '';
            state.master.photo.mimetype = '';
            state.master.photo.size = 0;
            state.master.description = '';
        },
        setResetPhotoInfo(state) {
            state.master.photo.selectedFile = null;
            state.master.photo.filename = '';
            state.master.photo.mimetype = '';
            state.master.photo.size = 0;
        },
        loadMasterData(state, action: PayloadAction<IMaster>) {
            state.master._id = action.payload._id;
            state.master.firstName = action.payload.firstName;
            state.master.lastName = action.payload.lastName;
            state.master.status = action.payload.status;
            state.master.quality = action.payload.quality;
            state.master.photo.filename = action.payload.photo?.filename;
            state.master.photo.mimetype = action.payload.photo?.mimetype;
            state.master.photo.size = action.payload.photo?.size;
            state.master.description = action.payload.description;
        },

    },
});

export default masterSlice.reducer;