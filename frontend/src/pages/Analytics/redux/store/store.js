import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from '../slice/slice'; 

const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
  },
});

export default store;
