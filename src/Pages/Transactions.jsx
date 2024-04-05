import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
// //  Styles for the grid component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from 'react-bootstrap/Button';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransaction, addTransaction, updateTransaction } from '../store/slices/transactionSlice';
// Components
import EnterTransaction from '../components/EnterTransaction';

const Transactions = () => {
    // Redux
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactionSlice.transactions);
    const [refresh, setRefresh] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const getTransactionsTotals = () => {
        let total = 0;
        if (transactions !== undefined && transactions.length > 0) {
            transactions.forEach(element => {
                if (element.account === 'Checking') {

                    total += element.amount;
                }
            });
        }
        return `Total: $${parseFloat(total.toFixed(2))}`;
    };
    const getTransExpensesTotals = () => {
        let total = 0;
        if (transactions !== undefined && transactions.length > 0) {
            transactions.forEach(element => {
                if (element.account === 'Expenses') {

                    total += element.amount;
                }
            });
        }
        return `Total: $${parseFloat(total.toFixed(2))}`;
    };

    const autoSizeStrategy = {
        type: 'fitGridWidth',
        columnLimits: [
            {
                colId: 'select',
                maxWidth: 50
            },
            {
                colId: 'date',
                maxWidth: 100
            },

        ]
    };

    const colDefs =

        [
            { field: "select", sortable: true, checkboxSelection: true, headerName: '' },
            //format date to mm/dd/yyyy 
            { field: "date", sortable: true, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
            { field: "description" },
            { field: "category" },
            //format amount to currency with 2 decimal places
            { field: "amount", sortable: true, valueFormatter: (params) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value) },
            { field: "account" },
        ]

    // Fetching the transactions
    useEffect(() => {
        dispatch(fetchTransactions());
        setRefresh(false);
    }, [dispatch, refresh]);



    // Add transaction function
    const handleAddTransaction = (newTransaction) => {
        dispatch(addTransaction(newTransaction))
            .then(() => {
                setRefresh(true);
            });
    };

    // // Delete transaction function  
    // const handleDelete = (id) => {
    //     dispatch(deleteTransaction(id)).then(() => {
    //         setRefresh(true);
    //     });
    // };

    // const handleUpdate = (transaction) => {
    //     dispatch(updateTransaction(transaction))
    //         .then(() => {
    //             setRefresh(true);
    //         });
    // };

    return (
        <div>
            <div
                className="ag-theme-quartz-dark"
                style={{ height: '100vh' }}
            >
                {showForm && <EnterTransaction handleAddTransaction={handleAddTransaction} />}
                <Button variant="primary" className="m-2" onClick={() => setShowForm(!showForm)}>Add Transaction</Button>{'  '}
                <h1 style={{ color: 'black' }}>Checking {getTransactionsTotals()}</h1>
                <h1 style={{ color: 'black' }}>Expenses {getTransactionsTotals()}</h1>
                <AgGridReact
                    rowData={transactions}
                    columnDefs={colDefs}
                    rowSelection='multiple'
                    autoSizeStrategy={autoSizeStrategy}
                    onRowSelected={(e) => console.log(e.data)}
                />
            </div>

            {/* {transactions && <Table data={transactions} handleDelete={handleDelete} />} */}
        </div>
    );
};

export default Transactions;
