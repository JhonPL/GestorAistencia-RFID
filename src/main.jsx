import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import Login from './login.jsx'
import Login2 from './loginPage.jsx'
import CoursesPage from './CoursesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login2/>
  </StrictMode>,
)
