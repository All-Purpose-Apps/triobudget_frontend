import React from 'react';
import { Button } from 'react-bootstrap';// Assuming this action exists and works as intended

const Table = ({ data, handleDelete }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
