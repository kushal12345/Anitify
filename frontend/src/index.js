import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import AuthProvider from './Components/Hooks/Auth/AuthProvider';
import TrackProvider from './Components/Hooks/Auth/TrackProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap AuthProvider with BrowserRouter */}
      <AuthProvider>
        <TrackProvider>
        <App />
        </TrackProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
  