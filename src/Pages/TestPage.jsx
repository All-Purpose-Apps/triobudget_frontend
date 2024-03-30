import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';
import Table from '../components/Table';
const auth = getAuth(app);

const data = [{ amount: 12, category: 'bills', date: '2024-10-01' }]

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
            <h1>Test Page</h1>
            <button onClick={handleSignOut}>Sign Out</button>
            <Table data={data} />
        </div>
    );
};

export default TestPage;