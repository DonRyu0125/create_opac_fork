import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import ErrorBoundary from './providers/ErrorBoundary'
import { ThemeProvider } from './providers/Theme'
import { Toaster } from '@/components/ui/toaster'
ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
		<ErrorBoundary>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<App />
				<Toaster />
			</ThemeProvider>
		</ErrorBoundary>
	// </React.StrictMode>
)
