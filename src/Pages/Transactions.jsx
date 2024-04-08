import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, addTransaction } from '../store/slices/transactionSlice';
import EnterTransaction from '../components/EnterTransaction';
import AddCategory from '../components/AddCategory';
//DATA
import { colDefs, autoSizeStrategy } from '../utils/ag-grid-data';

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactionSlice.transactions);
    const user = useSelector(state => state.userSlice.user);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const totalByAccount = (accountType) => transactions.reduce((acc, { account, amount }) => account === accountType ? acc + amount : acc, 0);

    const handleAddTransaction = newTransaction => dispatch(addTransaction(newTransaction));

    return (
        <div>
            <div className="ag-theme-quartz-dark" style={{ height: '100vh' }}>
                {showForm && user && <EnterTransaction handleAddTransaction={handleAddTransaction} user={user} />}
                <AddCategory />
                <Button variant="primary" className="m-2" onClick={() => setShowForm(!showForm)}>Add Transaction</Button>
                <AgGridReact
                    rowData={transactions}
                    columnDefs={colDefs}
                    rowSelection='multiple'
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
        </div>
    );
};

export default Transactions;
