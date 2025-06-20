import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'modern-normalize';
import App from './components/App';
import './components/App.module.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" />
  </StrictMode>
);
