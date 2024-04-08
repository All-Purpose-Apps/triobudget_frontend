import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const token = localStorage.getItem('token');

const getUser = createAsyncThunk('user/getUser', async (uid) => {
  const response = await axios.get(`http://localhost:3000/api_v1/users/${uid}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.data;
  return data;
});

const createUser = createAsyncThunk('user/createUser', async (user) => {
  const response = await axios.post('http://localhost:3000/api_v1/users/register', user, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return await response.data;
});

// const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
//   await axios.delete(`http://localhost:3000/api_v1/users/${id}`, {
//     headers: {
//       Authorization: `${token}`,
//     },
//   });
//   return id;
// });

const updateUser = createAsyncThunk('user/updateUser', async ({ id, data }) => {
  const response = await axios.put(`http://localhost:3000/api_v1/users/${id}`, data, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: {} },
  reducers: {},
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
    //   .addCase(addTransaction.fulfilled, (state, action) => {
    //     state.transactions.push(action.payload);
    //   })
  },
});

export { getUser, createUser, updateUser };
export default userSlice.reducer;
