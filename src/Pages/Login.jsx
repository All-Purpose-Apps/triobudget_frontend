import React, { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../utils/firebaseConfig';
import { useNavigate } from "react-router-dom";

const auth = getAuth(app)

const Login = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            // Handle login success
            console.log("Logged in successfully!");
            navigate("/test");
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage(error.message);
            setShowModal(true);
            // Handle login error
        }
    };
    return (
        <div>
            <div>
                <h1>Login Page</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onInput={(event) => setEmail(event.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onInput={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;