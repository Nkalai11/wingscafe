import React, { useState } from 'react';
import './register.css';  // Ensure this file exists
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  // Correct import for Firebase
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Instantiate navigate hook

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            // Create user with Firebase authentication
            await createUserWithEmailAndPassword(auth, email, password);
            setErrorMessage('');

            // After successful registration, navigate to login page
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.message);  // Show error if registration fails
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>

            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
};

export default Register;
