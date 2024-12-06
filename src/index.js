import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import './index.css';  // Optional if you have styles
import App from './App';  // Main App component
import reportWebVitals from './reportWebVitals';  // Optional, for performance reporting

const root = ReactDOM.createRoot(document.getElementById('root'));  // Get the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
