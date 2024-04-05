import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
// //  Styles for the grid component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from 'react-bootstrap/Button';
// Firebase Auth
import { getAuth, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransaction, addTransaction, updateTransaction } from '../store/slices/transactionSlice';
// Components
import EnterTransaction from '../components/EnterTransaction';

const Transactions = () => {
    // Firebase Auth
    const auth = getAuth(app);
    // Redux
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactionSlice.transactions);
    const [refresh, setRefresh] = useState(false);

    const autoSizeStrategy = {
        type: 'fitGridWidth',
        columnLimits: [
            {
                colId: 'select',
                maxWidth: 50
            }
        ]
    };

    const colDefs =

        [
            { field: "select", sortable: true, checkboxSelection: true },
            { field: "date", sortable: true },
            { field: "amount" },
            { field: "description" },
        ]

    // Fetching the transactions
    useEffect(() => {
        dispatch(fetchTransactions());
        setRefresh(false);
    }, [dispatch, refresh]);


    // Sign out function
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out successfully');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };
    // Delete transaction function  
    const handleDelete = (id) => {
        dispatch(deleteTransaction(id)).then(() => {
            setRefresh(true);
        });
    };
    // Add transaction function
    const handleAddTransaction = (newTransaction) => {
        dispatch(addTransaction(newTransaction))
            .then(() => {
                setRefresh(true);
            });
    };

    const handleUpdate = (transaction) => {
        dispatch(updateTransaction(transaction))
            .then(() => {
                setRefresh(true);
            });
    };

    return (
        <div>
            <h1>Transactions</h1>
            <Button variant="primary" size="sm" className="m-2" onClick={handleSignOut}>Sign Out</Button>

            <div
                className="ag-theme-quartz-dark" // applying the grid theme
                style={{ height: 500 }} // the grid will fill the size of the parent container
            >

                <AgGridReact
                    rowData={transactions}
                    columnDefs={colDefs}
                    rowSelection='multiple'
                    autoSizeStrategy={autoSizeStrategy}
                    onRowSelected={(e) => console.log(e.data)}
                />
            </div>
            <EnterTransaction handleAddTransaction={handleAddTransaction} />
            {/* {transactions && <Table data={transactions} handleDelete={handleDelete} />} */}
        </div>
    );
};

export default Transactions;
