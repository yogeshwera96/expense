// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import { AuthContextProvider } from './context/AuthContext'; // Correct import
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalStyle />
      <GlobalProvider>
      <BrowserRouter>  {/* Wrap App with BrowserRouter */}
        <App />
        </BrowserRouter>
      </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
