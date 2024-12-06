import React, { useState } from 'react';
import './login.css';  // Make sure this file exists
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database'; // Import missing functions
import { auth, database } from './firebase'; // Correct path
import { useNavigate } from 'react-router-dom'; // Use navigate hook

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Instantiate navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userRef = ref(database, 'users/');
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const users = snapshot.val();
                const user = Object.values(users).find((user) => user.username === username);

                if (user) {
                    await signInWithEmailAndPassword(auth, user.email, password);
                    setErrorMessage('');
                } else {
                    setErrorMessage('Username not found.');
                }
            } else {
                setErrorMessage('No users found.');
            }
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setErrorMessage('Incorrect password. Please try again.');
            } else if (error.code === 'auth/user-not-found') {
                setErrorMessage('User not found.');
            } else {
                setErrorMessage('Error logging in. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <p>
                Don't have an account?{' '}
                <button onClick={() => navigate('/register')}>Register here</button>
            </p>
        </div>
    );
};

export default Login;
