import { BrowserRouter } from "react-router"
import { createRoot } from 'react-dom/client'
import './index.css'
import AppMain from './AppMain.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AppMain />  
  </BrowserRouter>
)
