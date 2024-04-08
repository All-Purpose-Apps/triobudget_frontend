import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import transactionSlice from './slices/transactionSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    transactionSlice: transactionSlice,
    userSlice: userSlice,
  },
});

export default store;
