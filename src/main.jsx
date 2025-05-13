import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoginPage } from './auth/pages/loginPage.jsx';
import { CoursesPage } from './pages/CoursesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoursesPage/>
  </StrictMode>,
)
