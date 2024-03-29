import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <h1>Welcome to the Home Page</h1>
            <div className="row">
                <div className="col">
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
                <div className="col">
                    <Link to="/signup" className="btn btn-success">Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;