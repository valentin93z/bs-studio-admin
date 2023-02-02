import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMaster, IMasters } from "../../models/IMaster";

const initialState: IMasters = {
    masters: [],
    master: {
        _id: '',
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
        setDescription(state, action: PayloadAction<string>) {
            state.master.description = action.payload;
        },
        setReset(state) {
            state.master.firstName = '';
            state.master.lastName = '';
            state.master.status = 'active';
            state.master.quality = '';
            state.master.description = '';
        },
        loadMasterData(state, action: PayloadAction<IMaster>) {
            state.master._id = action.payload._id;
            state.master.firstName = action.payload.firstName;
            state.master.lastName = action.payload.lastName;
            state.master.status = action.payload.status;
            state.master.quality = action.payload.quality;
            state.master.description = action.payload.description;
        },
        setSelectedFile(state, action: PayloadAction<FileList | null>) {
            state.master.photo.selectedFile = action.payload;
        },
    },
});

export default masterSlice.reducer;