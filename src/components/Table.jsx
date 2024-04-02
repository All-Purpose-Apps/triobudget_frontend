import React from 'react';

const Table = ({ data }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;