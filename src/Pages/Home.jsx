import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div>
                <h1>Welcome to TrioBudget</h1>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Signup</button></Link>
            </div>
        </div>

    );
};

export default Home;
