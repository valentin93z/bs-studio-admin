import { createSlice } from "@reduxjs/toolkit";
import { ICalendar } from "../../models/ICalendar";

const initialState: ICalendar = {
    date: new Date().getTime(),
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        incrementMonth(state) {
            const date = state.date && new Date(state.date);
            state.date = date && date.setMonth(date.getMonth() + 1);
        },
        decrementMonth(state) {
            const date = state.date && new Date(state.date);
            state.date = date && date.setMonth(date.getMonth() - 1);
        },
    },
});

export default calendarSlice.reducer;