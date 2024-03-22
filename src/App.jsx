import React from 'react';
import TransactionTable from "./pages/Transactions";
import Login from "./pages/LoginForm";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const transactions = [
    { id: 1, date: '2024-03-20', description: 'Grocery shopping', amount: 95.76, type: 'Expense' },
    { id: 2, date: '2024-03-21', description: 'Salary', amount: 1500, type: 'Income' },
    // Add more transactions as needed
  ];

  return (
    <div>
      <Routes>
        {/* Redirect users based on their authentication state */}
        <Route path="/" element={isLoggedIn ? <Navigate replace to="/transactions" /> : <Login />} />
        <Route path="/transactions" element={isLoggedIn ? <TransactionTable transactions={transactions} /> : <Navigate replace to="/" />} />

        {/* Optionally, handle a "catch-all" route for undefined paths */}
        <Route path="*" element={<Navigate replace to={isLoggedIn ? "/transactions" : "/"} />} />
      </Routes>
    </div>
  );
}
