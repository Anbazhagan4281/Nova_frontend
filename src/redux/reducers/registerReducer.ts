// store/reducers/registerReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	username: string;
	email: string;
	phone: string;
}

interface InitialState {
	user: User | null;
	registerLoading: boolean;
	registerAuth: boolean;
	registerError: string | null;  // Adjusted type to string | null
}

const initialState: InitialState = {
	user: null,
	registerLoading: false,
	registerAuth: false,
	registerError: null,
};

const registerSlice = createSlice({
	name: 'register',
	initialState: initialState,
	reducers: {
		registerLoading: (state) => {
			state.registerLoading = true;
			state.registerAuth = false;
			state.registerError = null;
		},
		registerSuccess: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.registerLoading = false;
			state.registerAuth = true;
			state.registerError = null;
		},
		registerFailed: (state, action: PayloadAction<string>) => {
			state.registerError = action.payload;
			state.registerAuth = false;
			state.registerLoading = false;
		},
	},
});

export const { registerLoading, registerSuccess, registerFailed } = registerSlice.actions;
export default registerSlice.reducer;
