import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import Login2 from './auth/pages/loginPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login2/>
  </StrictMode>,
)
