import { configureStore, createSlice } from '@reduxjs/toolkit';
import app from '../utils/firebaseConfig';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const auth = getAuth(app);

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

// Firebase Auth State Check
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(authActions.setLoginState(true));
  } else {
    store.dispatch(authActions.setLoginState(false));
  }
});

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export default store;
export const authActions = authSlice.actions;
