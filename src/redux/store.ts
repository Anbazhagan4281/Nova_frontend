import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import registerReducer from './reducers/registerReducer.ts';
import storeReducer from './reducers/storeReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    store: storeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
