import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from '@utils/webVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report Web Vitals for performance monitoring
reportWebVitals();
