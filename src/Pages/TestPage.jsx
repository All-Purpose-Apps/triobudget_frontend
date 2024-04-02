import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';
import Table from '../components/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const auth = getAuth(app);

const data = [{ amount: 12, category: 'bills', date: '2024-10-01' }];

const TestPage = () => {
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
            <Table data={data} />
        </div>
    );
};

export default TestPage;