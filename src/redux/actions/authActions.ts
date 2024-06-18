// store/actions/authActions.ts
import { loginRequest, loginSuccess, loginFailure } from "../reducers/authReducer";
import { AppDispatch } from "../store";
import { instance } from "../../axios";

interface Credentials {
	email: string;
	password: string;
}

export const login = (credentials: Credentials) => async (dispatch: AppDispatch) => {
	dispatch(loginRequest());
	try {
		const response = await instance.post('login/', credentials);
		const { access_token, username } = response.data;
		if (response.status === 200) {
			dispatch(loginSuccess({ access_token, username }));
		}
	} catch (error) {
		console.log(error);
		dispatch(loginFailure(error.response?.data.detail));
	}
};
