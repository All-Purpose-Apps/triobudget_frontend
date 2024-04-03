import React, { useState, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { sort } from 'fast-sort';

const DataTable = ({ data, handleDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const sortedItems = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig.key) {
            sortableItems = sortConfig.direction === 'ascending'
                ? sort(sortableItems).by([{ asc: u => u[sortConfig.key] }])
                : sort(sortableItems).by([{ desc: u => u[sortConfig.key] }]);
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th onClick={() => requestSort('date')}>Date</th>
                    <th onClick={() => requestSort('amount')}>Amount</th>
                    <th onClick={() => requestSort('category')}>Category</th>
                    <th onClick={() => requestSort('description')}>Description</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {sortedItems.map((item, index) => {
                    const date = new Date(item.date).toLocaleDateString();
                    return (
                        <tr key={index}>
                            <td>{date}</td>
                            <td>{item.amount}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
};

export default DataTable;