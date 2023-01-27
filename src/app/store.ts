import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice/calendarSlice';
import eventReducer from './eventSlice/eventSlice';
import authReducer from './authSlice/authSlice';
import masterReducer from './masterSlice/masterSlice';
import serviceReducer from './serviceSlice/serviceSlice';
import interfaceReducer from './interfaceSlice/interfaceSlice';

export const store = configureStore({
  reducer: {
    calendarReducer,
    eventReducer,
    authReducer,
    masterReducer,
    serviceReducer,
    interfaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;