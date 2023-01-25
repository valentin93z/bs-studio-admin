import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMaster, IMasters } from "../../models/IMaster";

const initialState: IMasters = {
    masters: [],
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setMasters(state, action: PayloadAction<IMaster[]>) {
            state.masters = action.payload;
        },
    },
});

export default masterSlice.reducer;