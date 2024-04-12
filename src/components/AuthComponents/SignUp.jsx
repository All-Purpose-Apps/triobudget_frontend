import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { createUser } from '../../store/slices/userSlice';
import app from '../../utils/firebaseConfig';

const auth = getAuth(app);

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formState;
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(createUser({
                name,
                uid: userCredential.user.uid,
                email
            }));
            navigate("/test");
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                {['name', 'email', 'password', 'confirmPassword'].map((field) => (
                    <div className="form-group" key={field}>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            className="form-control mb-2"
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('confirmPassword', 'Confirm Password')}
                            value={formState[field]}
                            autoComplete={field === 'password' || field === 'confirmPassword' ? 'current-password' : field}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
