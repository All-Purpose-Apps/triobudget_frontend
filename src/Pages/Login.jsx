import { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../utils/firebaseConfig';
import { useNavigate } from "react-router-dom";

const auth = getAuth(app)

const Login = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            // Handle login success
            console.log("Logged in successfully!");
            navigate("/test");
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error
        }
    };
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    autoComplete='username'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoComplete='current-password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;