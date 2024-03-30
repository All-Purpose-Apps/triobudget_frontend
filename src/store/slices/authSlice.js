import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoginState } = authSlice.actions;

export default authSlice.reducer;
