import { useEffect, useState, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, addTransaction, deleteTransaction } from '../../store/slices/transactionSlice';
import EnterTransaction from './EnterTransaction';
//DATA
import { colDefs, autoSizeStrategy } from '../../utils/ag-grid-data';
import Chart from './ShowTotals';

const Transactions = () => {
    const gridRef = useRef(null);
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactionSlice.transactions);
    const uniqueAccounts = [...new Set(transactions.map(transaction => transaction.account))];
    const user = useSelector(state => state.userSlice.user);
    const [showForm, setShowForm] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        setSelectedRows(selectedRows);
    }, []);

    const handleAddTransaction = (newTransaction) => {
        setShowForm(false)
        dispatch(addTransaction(newTransaction));
    }
    const handleDelete = () => {
        selectedRows.forEach(row => {
            dispatch(deleteTransaction(row._id));
        });
    }

    const handleClose = () => {
        setShowForm(false);
    }
    return (
        <div>
            {showForm && user && <EnterTransaction handleAddTransaction={handleAddTransaction} user={user} show={showForm} handleClose={handleClose} />}
            <button className="icon-button" onClick={() => setShowForm(!showForm)} aria-label="Add Transaction">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" className="circle" />
                    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="tooltip">Add Transaction</span>
            </button>
            <div className="charts-container" style={{ display: 'flex', justifyContent: 'center' }}>
                {uniqueAccounts.map((account, index) =>
                    <div key={index}>
                        <Chart transactions={transactions.filter(t => t.account === account)} account={account} />
                    </div>
                )}
            </div>

            <div className="ag-theme-quartz-dark" style={{ height: '500px', width: '99%' }}>
                {selectedRows.length > 0 ? (
                    <Button variant="danger" className='m-2 delete-button' onClick={() => handleDelete()}>Delete</Button>
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