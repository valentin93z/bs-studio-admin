import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IService, IServices } from "../../models/IService";

const initialState: IServices = {
  services: [],
  service: {
    _id: '',
    title: '',
    price: '',
    type: '',
    status: 'active',
    description: '',
  },
};

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setServices(state, action: PayloadAction<IService[]>) {
          state.services = action.payload;
        },
        setTitle(state, action: PayloadAction<string>) {
          state.service.title = action.payload;
        },
        setPrice(state, action: PayloadAction<string>) {
          state.service.price = action.payload;
        },
        setType(state, action: PayloadAction<string>) {
          state.service.type = action.payload;
        },
        setStatus(state, action: PayloadAction<string>) {
          state.service.status = action.payload;
        },
        setDescription(state, action: PayloadAction<string>) {
          state.service.description = action.payload;
        },
        setReset(state) {
          state.service.title = '';
          state.service.price = '';
          state.service.type = '';
          state.service.status = 'active';
          state.service.description = '';
        },
        loadServiceData(state, action: PayloadAction<IService>) {
          state.service = action.payload;
        },
    },
});

export default serviceSlice.reducer;