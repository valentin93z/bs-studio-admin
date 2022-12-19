import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IEvents } from "../../models/IEvent";
import { IDay } from "../../models/IDay";

const initialState: IEvents = {
    events: [],
    newEvent: {
        date: {
            year: 0,
            month: 0,
            day: 0,
        },
        time: {
            hours: 0,
            minutes: 0,
        },
    },
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setDate(state, action: PayloadAction<string>) {
            const data: IDay = JSON.parse(action.payload);
            state.newEvent.date.year = data.year;
            state.newEvent.date.month = data.month;
            state.newEvent.date.day = data.dayOfMonth;
        },
    }
});

export default eventSlice.reducer;