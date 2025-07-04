import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './styles/main.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);