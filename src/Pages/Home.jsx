import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center text-center" style={{ minHeight: "100vh" }}>
            <div>
                <h1>Welcome to TrioBudget</h1>
                <Link to="/login" className="m-2">
                    <Button variant="primary">Login</Button>
                </Link>
                <Link to="/signup" className="m-2">
                    <Button variant="success">Signup</Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
