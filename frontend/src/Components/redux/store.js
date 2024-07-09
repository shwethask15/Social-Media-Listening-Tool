import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from '../../pages/Analytics/redux/slice/slice';
import authReducer from './authSlice';
import { authApi } from './authApi';

const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;


