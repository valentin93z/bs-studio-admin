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
        photoUrl: '',
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
        }
    },
});

export default masterSlice.reducer;