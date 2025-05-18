import { Routes, Route, Navigate } from "react-router-dom";
//import { LoginPage } from "../auth/pages/LoginPage";
import { CoursesPage } from "../pages/";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { LoginPage } from "../auth/pages/"

export const AppRouter = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? <Navigate to="/courses" /> : <LoginPage />
                }
            />
            <Route
                path="/courses"
                element={
                    isAuthenticated ? <CoursesPage /> : <Navigate to="/" />
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};