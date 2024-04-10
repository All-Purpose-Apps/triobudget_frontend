import { useEffect, useState, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, addTransaction, deleteTransaction } from '../store/slices/transactionSlice';
import EnterTransaction from '../components/EnterTransaction';
import AddCategory from '../components/AddCategory';
//DATA
import { colDefs, autoSizeStrategy } from '../utils/ag-grid-data';
import Chart from '../components/ShowTotals';

const Transactions = () => {
    const gridRef = useRef(null);
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactionSlice.transactions);
    const uniqueAccounts = [...new Set(transactions.map(transaction => transaction.account))];
    const user = useSelector(state => state.userSlice.user);
    const [showForm, setShowForm] = useState(false);
    const [showCatForm, setShowCatForm] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        setSelectedRows(selectedRows);
    }, []);

    const handleAddTransaction = newTransaction => dispatch(addTransaction(newTransaction));
    const handleDelete = () => {
        selectedRows.forEach(row => {
            dispatch(deleteTransaction(row._id));
        });
    }

    return (
        <div>
            <div className="ag-theme-quartz-dark" style={{ height: '100vh' }}>
                {showForm && user && <EnterTransaction handleAddTransaction={handleAddTransaction} user={user} />}
                {showCatForm && user && <AddCategory user={user} />}
                <Button variant="primary" className="m-2" onClick={() => setShowForm(!showForm)}>Add Transaction</Button>
                <Button variant="primary" className="m-2" onClick={() => setShowCatForm(!showCatForm)}>Add Category</Button>
                <div className="charts-container" style={{ display: 'flex', justifyContent: 'center' }}>
                    {uniqueAccounts.map((account, index) =>
                        <div key={index}>
                            <Chart transactions={transactions.filter(t => t.account === account)} account={account} />
                        </div>
                    )}
                </div>
                {selectedRows.length > 0 ? (
                    <Button variant="danger" className='m-2' onClick={() => handleDelete()}>Delete</Button>
                ) : null}
                <AgGridReact
                    rowData={transactions}
                    ref={gridRef}
                    onSelectionChanged={onSelectionChanged}
                    columnDefs={colDefs}
                    rowSelection='multiple'
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
        </div >
    );
};

export default Transactions;