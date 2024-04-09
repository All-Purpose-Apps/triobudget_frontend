import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3000/api_v1/transactions';

const getToken = () => localStorage.getItem('token');

const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const response = await axios.get(baseURL, {
    headers: {
      Authorization: getToken(),
    },
  });
  const data = response.data;
  localStorage.setItem('transactions', JSON.stringify(data));
  return data;
});

const addTransaction = createAsyncThunk('transaction/addTransaction', async (transaction) => {
  const response = await axios.post(baseURL, transaction, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
});

const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  await axios.delete(`${baseURL}/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return id;
});

const updateTransaction = createAsyncThunk('transaction/updateTransaction', async ({ id, data }) => {
  const response = await axios.put(`${baseURL}/${id}`, data, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { transactions: [], status: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      });
  },
});

export { fetchTransactions, addTransaction, deleteTransaction, updateTransaction };
export default transactionSlice.reducer;
