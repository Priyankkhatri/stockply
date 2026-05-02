import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#2B2B2B',
                color: '#FFFFFF',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '16px 24px',
              },
            }}
          />
        </HelmetProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
