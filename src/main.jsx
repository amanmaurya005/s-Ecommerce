import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './ecommerce.css'
import './styles/cart.css';
import './styles/singleProduct.css';
import Router from "./pages/Router"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router/>
  </StrictMode>,
)


