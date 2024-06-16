import { configureStore } from '@reduxjs/toolkit';
import liveVerbatimsReducer from '../slice/slice'; 

const store = configureStore({
  reducer: {
    liveVerbatims: liveVerbatimsReducer,
  },
});

export default store;
