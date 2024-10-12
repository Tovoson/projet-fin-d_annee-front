import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';  // Roboto légère
import '@fontsource/roboto/400.css';  // Roboto normale
import '@fontsource/roboto/500.css';  // Roboto moyenne
import '@fontsource/roboto/700.css';  // Roboto en gras

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
