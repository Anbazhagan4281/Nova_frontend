// store/actions/registerActions.ts
import { instance } from "../../axios";
import { AppDispatch } from "../store";
import { registerLoading, registerSuccess, registerFailed } from "../reducers/registerReducer";

interface Credentials {
	username: string;
	email: string;
	phone: string;
	password: string;
}

export const register = (credentials: Credentials) => async (dispatch: AppDispatch) => {
	dispatch(registerLoading());
	try {
		const response = await instance.post('register/', credentials);
		dispatch(registerSuccess(response.data));
	} catch (error) {
		console.log(error);
		dispatch(registerFailed(error.response?.data));
	}
};
