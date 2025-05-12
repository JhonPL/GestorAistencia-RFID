import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import Login from './login.jsx'
import Login2 from './login2.jsx'
import MisCursos from './Miscursos.jsx'
import CoursesPage from './CoursesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login2/>
  </StrictMode>,
)
