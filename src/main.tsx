import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import './i18n';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.tsx';
import { StoreProvider } from './context/StoreContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </AuthProvider>,
)
