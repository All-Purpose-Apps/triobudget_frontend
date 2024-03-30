import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import transactionSlice from './slices/transactionSlice';

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    transactionSlice: transactionSlice,
  },
});

export default store;
