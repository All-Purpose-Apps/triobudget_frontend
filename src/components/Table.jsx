import React from 'react';
import fetchTransactions from '../store/slices/transactionSlice';
import { useSelector, useDispatch } from 'react-redux';

const Table = ({ data }) => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;