import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	importModel: boolean
}

const initialState: InitialState = {
	importModel: false
}
const storeReducer = createSlice({
	name: 'storeReducer',
	initialState: initialState,
	reducers: {
		toogleModel: (state) => {
			state.importModel = !state.importModel
		}
	}
})

export const {toogleModel} = storeReducer.actions
export default storeReducer.reducer