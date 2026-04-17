import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App.jsx';
import './index.css';
import { testConnection } from './lib/supabase';

// Diagnostic: Run connection test on initialization
testConnection();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
