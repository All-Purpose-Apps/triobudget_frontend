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
import Chart from '../components/ShowTotals';

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactionSlice.transactions);
    const uniqueAccounts = [...new Set(transactions.map(transaction => transaction.account))];
    const user = useSelector(state => state.userSlice.user);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleAddTransaction = newTransaction => dispatch(addTransaction(newTransaction));

    return (
        <div>
            <div className="ag-theme-quartz-dark" style={{ height: '100vh' }}>
                {showForm && user && <EnterTransaction handleAddTransaction={handleAddTransaction} user={user} />}
                <AddCategory />
                <Button variant="primary" className="m-2" onClick={() => setShowForm(!showForm)}>Add Transaction</Button>
                <div className="charts-container" style={{ display: 'flex', justifyContent: 'center' }}>
                    {uniqueAccounts.map((account, index) =>
                        <div key={index}>
                            <Chart transactions={transactions.filter(t => t.account === account)} account={account} />
                        </div>
                    )}
                </div>

                <AgGridReact
                    rowData={transactions}
                    columnDefs={colDefs}
                    rowSelection='multiple'
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>
        </div >
    );
};

export default Transactions;