import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/auth-context';
import { UsersContextProvider } from './Context/users-context';
import { UserContextProvider } from './Context/actualUser-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersContextProvider>
  <AuthContextProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
  </AuthContextProvider>
  </UsersContextProvider>
);


