import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';
import Table from '../components/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../store/slices/transactionSlice';


const TestPage = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactionSlice.transactions);
    // Fetching the transaction list
    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out successfully');
            })
            .catch((error) => {
                // An error happened.
                console.error('Error signing out:', error);
            });
    };

    return (
        <div>
            <h1 className="text-center">Test Page</h1>
            <Button onClick={handleSignOut}>Sign Out</Button>
            <Table data={transactions} />
        </div>
    );
};

export default TestPage;