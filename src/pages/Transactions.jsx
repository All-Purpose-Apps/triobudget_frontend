import { TableHead, TableContainer, Table, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import React from 'react';

// Assuming each transaction has an id, date, description, amount, and type (Income or Expense)
const TransactionTable = ({ transactions }) => {
    return (
        <div>
            <h2>Transactions</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>${transaction.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TransactionTable;
