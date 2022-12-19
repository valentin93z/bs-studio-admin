import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICalendar } from "../../models/ICalendar";
import { IDay } from "../../models/IDay";

const initialState: ICalendar = {
    date: new Date().getTime(),
    days: [],
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
        getDays(state, action: PayloadAction<IDay[]>) {
            state.days = action.payload;
        }
    },
});

export default calendarSlice.reducer;