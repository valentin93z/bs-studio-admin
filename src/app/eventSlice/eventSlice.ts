import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IEvent, IEvents } from "../../models/IEvent";
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
            hours: '',
            minutes: '',
        },
        status: "free",
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
        setHours(state, action: PayloadAction<string>) {
            state.newEvent.time.hours = action.payload;
        },
        setMinutes(state, action: PayloadAction<string>) {
            state.newEvent.time.minutes = action.payload;
        },
        setEvents(state, action: PayloadAction<IEvent[]>) {
            state.events = action.payload;
        },
    }
});

export default eventSlice.reducer;