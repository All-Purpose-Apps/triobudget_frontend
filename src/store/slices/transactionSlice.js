import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const token = localStorage.getItem('token');

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const response = await axios.get('http://localhost:3000/api_v1/transactions', {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.data;
  localStorage.setItem('transactions', JSON.stringify(data));
  return data;
});

export const addTransaction = createAsyncThunk('transaction/addTransaction', async (transaction) => {
  const response = await axios.post('http://localhost:3000/api_v1/transactions', transaction, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return await response.data;
});
export const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  await axios.delete(`http://localhost:3000/api_v1/transactions/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return id;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { transactions: [], status: 'idle', error: null },
  reducers: {
    updateTransaction: (state, action) => {
      const { id, description, amount, category, user, date } = action.payload;
      const transaction = state.transactions.find((transaction) => transaction.id === id);
      if (transaction) {
        transaction.description = description;
        transaction.amount = amount;
        transaction.category = category;
        transaction.user = user;
        transaction.date = date;
      }
    },
  },
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
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      });
  },
});

export const { updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
