import { useEffect, useState } from 'react';
// Firebase Auth
import { getAuth, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransaction } from '../store/slices/transactionSlice';
// Components
import Table from '../components/Table';
import Button from 'react-bootstrap/Button';
import EnterTransaction from '../components/EnterTransaction';

const Transactions = () => {
    // Firebase Auth
    const auth = getAuth(app);
    // Redux
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactionSlice.transactions);
    const [refresh, setRefresh] = useState(false); // Add this line

    // Fetching the transactions
    useEffect(() => {
        dispatch(fetchTransactions());
        setRefresh(false); // Reset refresh state after data is fetched
    }, [dispatch, refresh]); // Update this line

    // Sign out function
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('User signed out successfully');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteTransaction(id)).then(() => {
            setRefresh(true); // Trigger re-fetching after deletion
        });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h1 className="text-center mb-4">Transactions</h1>
            <Button variant="primary" onClick={handleSignOut} className="mb-4">Sign Out</Button>
            <EnterTransaction />
            <Table data={transactions} handleDelete={handleDelete} />
        </div>
    );
};

export default Transactions;
