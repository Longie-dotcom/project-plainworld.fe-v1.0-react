import App from './App.jsx'

import './css/base.css';
import './css/element.css';
import './css/component.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
