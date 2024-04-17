import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api_v1/users' || `${import.meta.env.VITE_DATABASE_URL}api_v1/users`;

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: getToken() },
});

const getUser = createAsyncThunk('user/getUser', async (uid) => {
  const response = await axiosInstance.get(`/${uid}`);
  return response.data;
});

const createUser = createAsyncThunk('user/createUser', async (user) => {
  const response = await axiosInstance.post('/register', user);
  return response.data;
});

const updateUser = createAsyncThunk('user/updateUser', async ({ id, data }) => {
  const response = await axiosInstance.put(`/${id}`, data);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: {} },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export { getUser, createUser, updateUser };
export default userSlice.reducer;
