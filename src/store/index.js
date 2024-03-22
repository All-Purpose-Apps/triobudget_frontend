import { configureStore, createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebaseConfig'; // Adjust the import path as necessary
import { onAuthStateChanged } from 'firebase/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

// Firebase Auth State Check
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, dispatch login action
    store.dispatch(authActions.setLoginState(true));
  } else {
    // User is signed out, dispatch logout action
    store.dispatch(authActions.setLoginState(false));
  }
});

export { store };
