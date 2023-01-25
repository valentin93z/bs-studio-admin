import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice/calendarSlice';
import eventReducer from './eventSlice/eventSlice';
import authSlice from './authSlice/authSlice';
import masterSlice from './masterSlice/masterSlice';

export const store = configureStore({
  reducer: {
    calendarReducer,
    eventReducer,
    authSlice,
    masterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;