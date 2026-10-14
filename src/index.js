import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: Place your styling rules here

// Select the root div inside your index.html file
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the application interface
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
