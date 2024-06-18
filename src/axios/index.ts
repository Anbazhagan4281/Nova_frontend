import axios from "axios";
import { store } from "../redux/store";
import { loginFailure } from "../redux/reducers/authReducer";

export const instance = axios.create({
	baseURL: 'http://localhost:8000/api/'
})

instance.interceptors.request.use((config) => {
	const state = store.getState()
	const token = state.auth.token
	
	if(token){
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
}, (err) => {
	console.log(err);
	
	return Promise.reject(err)
})


instance.interceptors.response.use((response) => {
	return response
}, (err) => {
	console.log(err);
	if(err.response.status === 401) {
		console.log('logout');
		
		store.dispatch(loginFailure(err.response.data))
	}
	return Promise.reject(err)
})