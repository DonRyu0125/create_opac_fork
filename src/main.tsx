import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import ErrorBoundary from './providers/ErrorBoundary.tsx';
import { ThemeProvider } from './providers/Theme.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
