import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IContact } from "../../models/IContact";

const initialState: IContact = {
    _id: {},
    address: {
        city: '',
        street: '',
        house: '',
    },
    schedule: '',
    phone: '',
    social: {
        instagram: '',
        telegram: '',
        vk: '',
        whatsapp: '',
        viber: '',
    },
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContacts(state, action: PayloadAction<IContact>) {
            state._id = action.payload._id;
            state.address = action.payload.address;
            state.schedule = action.payload.schedule;
            state.phone = action.payload.phone;
            state.social = action.payload.social;
        },
        setCity(state, action: PayloadAction<string>) {
            state.address.city = action.payload;
        },
        setStreet(state, action: PayloadAction<string>) {
            state.address.street = action.payload;
        },
        setHouse(state, action: PayloadAction<string>) {
            state.address.house = action.payload;
        },
        setSchedule(state, action: PayloadAction<string>) {
            state.schedule = action.payload;
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        setSocialInstagram(state, action: PayloadAction<string>) {
            state.social.instagram = action.payload;
        },
        setSocialTelegram(state, action: PayloadAction<string>) {
            state.social.telegram = action.payload;
        },
        setSocialVk(state, action: PayloadAction<string>) {
            state.social.vk = action.payload;
        },
        setSocialWatsapp(state, action: PayloadAction<string>) {
            state.social.whatsapp = action.payload;
        },
        setSocialViber(state, action: PayloadAction<string>) {
            state.social.viber = action.payload;
        },
    },
});

export default contactSlice.reducer;