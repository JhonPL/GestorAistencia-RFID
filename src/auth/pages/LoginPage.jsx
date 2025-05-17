import { useEffect } from 'react';
import { displayThemeButtons, startAutoTheme } from './themes';
import "./LoginPage.css";

export const LoginPage = () => {
    useEffect(() => {
        displayThemeButtons();
        startAutoTheme(5000);
    }, []);
    return (
        <>
            <div className="main-container">
                <section className="container">
                    <div className="login-container">
                        <div className="circle circle-one"></div>
                        <div className="form-container">
                            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                            <h1 className="opacity">LOGIN</h1>
                            <form>
                                <input type="text" placeholder="USERNAME" />
                                <input type="password" placeholder="PASSWORD" />
                                <button className="opacity">Iniciar Sesión</button>
                            </form>
                            <div className="register-forget opacity">
                            </div>
                        </div>
                        <div className="circle circle-two"></div>
                    </div>
                    <div className="theme-btn-container"></div>
                </section>
            </div>
        </>
    )
}