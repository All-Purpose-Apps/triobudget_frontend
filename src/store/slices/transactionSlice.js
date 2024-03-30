import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { transactions: [] },
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
  },
});

export const { addTransaction, removeTransaction, updateTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
