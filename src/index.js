import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/auth-context';
import { UsersContextProvider } from './Context/users-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersContextProvider>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </UsersContextProvider>
);


