import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../utils/firebaseConfig';
const auth = getAuth(app)

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Handle successful signup
            console.log('User signed up:', userCredential.user);
        } catch (error) {
            // Handle signup error
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
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
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;