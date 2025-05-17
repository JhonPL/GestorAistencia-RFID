import { BrowserRouter as Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "./auth/pages/index.js";
import { CoursesPage } from "./pages/index.js";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  );
}

export default App;