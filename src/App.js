import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Login from './login';
import Register from './register';
import './App.css';

function App() {
    const [inventory, setInventory] = useState(() => {
        return JSON.parse(localStorage.getItem('inventory')) || [];
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [user, setUser] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register view

    // Store inventory in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    // Handle adding a new product to inventory
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { name, description, category, price, quantity } = formState;
        setInventory([
            ...inventory,
            { name, description, category, price: parseFloat(price), quantity: parseInt(quantity) }
        ]);
        setModalVisible(false);
        setFormState({ name: '', description: '', category: '', price: '', quantity: '' });
    };

    // Handle removing a product from inventory
    const handleRemoveProduct = (index) => {
        const newInventory = [...inventory];
        newInventory.splice(index, 1);
        setInventory(newInventory);
    };

    // If no user is logged in, show login and registration routes
    if (!user) {
        return (
            <Router>
                <Routes>
                    <Route 
                        path="/login" 
                        element={<Login setIsRegistering={setIsRegistering} />} 
                    />
                    <Route 
                        path="/register" 
                        element={<Register />} 
                    />
                    {/* Redirect to login if the route doesn't match */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        );
    }

    // If a user is logged in, show the main inventory management system
    return (
        <Router>
            <div className="App">
                <h1>Malome's Inventory Management</h1>

                {/* Navigation buttons */}
                <nav className="navbar">
                    <div className="left-nav">
                        <button onClick={() => setModalVisible(true)}>Add Product</button>
                    </div>
                    <div className="right-nav">
                        <button onClick={() => auth.signOut()}>Logout</button>
                    </div>
                </nav>

                {/* Display inventory */}
                <div id="inventory-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category}</td>
                                    <td>{`$${product.price.toFixed(2)}`}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button onClick={() => handleRemoveProduct(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for adding products */}
                {modalVisible && (
                    <div id="product-modal">
                        <div className="modal-content">
                            <button id="close-modal" onClick={() => setModalVisible(false)}>Close</button>
                            <form id="product-form" onSubmit={handleFormSubmit}>
                                <input type="text" name="name" value={formState.name} onChange={handleInputChange} placeholder="Product Name" required />
                                <input type="text" name="description" value={formState.description} onChange={handleInputChange} placeholder="Description" required />
                                <input type="text" name="category" value={formState.category} onChange={handleInputChange} placeholder="Category" required />
                                <input type="number" name="price" value={formState.price} onChange={handleInputChange} placeholder="Price" required />
                                <input type="number" name="quantity" value={formState.quantity} onChange={handleInputChange} placeholder="Quantity" required />
                                <button type="submit">Add Product</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
