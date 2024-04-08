import React, { useState } from 'react';
import { createUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import app from '../utils/firebaseConfig';
const auth = getAuth(app)

const SignUp = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            if (password !== confirmPassword) {
                alert("Passwords do not match.")
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = {
                    name: name,
                    uid: userCredential.user.uid,
                    email: email
                };
                dispatch(createUser(user))
                navigate("/test");
            }

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
                    type="text"
                    placeholder="Name"
                    value={name}
                    autoComplete='name'
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    autoComplete='current-password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;