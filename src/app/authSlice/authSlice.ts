import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    login: {
        email: '',
        password: '',
    },
    passwordIsVisible: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.login.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.login.password = action.payload;
        },
        setPasswordIsVisible(state) {
            state.passwordIsVisible = !state.passwordIsVisible;
        },
    },
});

export default authSlice.reducer;