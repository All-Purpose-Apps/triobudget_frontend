import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const response = await fetch('your-endpoint-here');
  const data = await response.json();
  return data;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { transactions: [], status: 'idle', error: null },
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
    removeTransaction: (state, action) => {
      return state.filter((transaction) => transaction.id !== action.payload);
    },
    updateTransaction: (state, action) => {
      const { id, description, amount, category, user, date } = action.payload;
      const transaction = state.find((transaction) => transaction.id === id);
      if (transaction) {
        transaction.description = description;
        transaction.amount = amount;
        transaction.category = category;
        transaction.user = user;
        transaction.date = date;
      }
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
        });
    },
  },
});

export const { addTransaction, removeTransaction, updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
