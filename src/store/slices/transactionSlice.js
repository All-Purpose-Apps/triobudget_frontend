import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const token = localStorage.getItem('token');

const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const response = await axios.get('http://localhost:3000/api_v1/transactions', {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await response.data;
  localStorage.setItem('transactions', JSON.stringify(data));
  return data;
});

const addTransaction = createAsyncThunk('transaction/addTransaction', async (transaction) => {
  const response = await axios.post('http://localhost:3000/api_v1/transactions', transaction, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return await response.data;
});
const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  await axios.delete(`http://localhost:3000/api_v1/transactions/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return id;
});

const updateTransaction = createAsyncThunk('transaction/updateTransaction', async ({ id, data }) => {
  debugger;
  const response = await axios.put(`http://localhost:3000/api_v1/transactions/${id}`, data, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data; // Return the updated transaction object instead of just the ID
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { transactions: [], status: 'idle', error: null },
  reducers: {},
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
