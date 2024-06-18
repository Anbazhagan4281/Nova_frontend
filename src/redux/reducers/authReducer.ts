// store/reducers/authReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    loginLoading: boolean;
    loginError: string | null;
}

const initialState: InitialState = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    isAuthenticated: !!localStorage.getItem('token'),
    loginLoading: false,
    loginError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginRequest: (state) => {
            state.loginLoading = true;
            state.loginError = null;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action: PayloadAction<{ access_token: string; username: string }>) => {
            const { access_token, username } = action.payload;
            state.token = access_token;
            state.username = username;
            state.isAuthenticated = true;
            state.loginLoading = false;
            localStorage.setItem('token', access_token);
            localStorage.setItem('username', username);
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loginError = action.payload;
            state.loginLoading = false;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },
        logOut: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.username = null;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logOut } = authSlice.actions;
export default authSlice.reducer;
