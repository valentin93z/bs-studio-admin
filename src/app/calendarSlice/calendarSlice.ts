import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    date: '',
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {

    }
});

export default calendarSlice.reducer;