import { useState } from 'react';
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import app from '../utils/firebaseConfig';

const auth = getAuth(app)

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            // Handle login success
            console.log("Logged in successfully!");
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle login error
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        console.log('User signed out');
    }

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
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Login;