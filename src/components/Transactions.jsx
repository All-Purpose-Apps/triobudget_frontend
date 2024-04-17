import { useEffect, useState, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, addTransaction, deleteTransaction } from '../store/slices/transactionSlice';
import EnterTransaction from './EnterTransaction';
//DATA
import { colDefs, autoSizeStrategy } from '../utils/ag-grid-data';

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
        </div >
    );
};

export default Transactions;