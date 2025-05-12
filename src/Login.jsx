
import './login.css'

import React, { useEffect } from 'react';

const LoginPage = () => {
    useEffect(() => {
        document.processLogonForm.userName.focus();
    }, []);

    const doLogin = () => {
        // Aquí iría la lógica para manejar el inicio de sesión
    };

    return (
        <div className="background5" onLoad={() => document.processLogonForm.userName.focus()}>
            <div className="wrapper">
                <div className="header">
                    <div style={{ float: 'left', marginTop: '10px' }}>
                        <img src="https://campusvirtual.ucc.edu.co/d2l/loginh/images/logo_campus_virtual_198x51.png" alt="Logo Campus Virtual" />
                    </div>
                    <div style={{ float: 'right', marginRight: '10px' }}>
                        <img src="https://campusvirtual.ucc.edu.co/d2l/loginh/images/universidad-cooperativa-colombia_small.png" alt="Logo Universidad Cooperativa de Colombia" />
                    </div>
                </div>
                <div className="content_frame" style={{ marginTop: '80px' }}>
                    <form className="LogonForm" name="processLogonForm" onSubmit={doLogin}>
                        <span className="error-msg hidden">* Please try again.</span>
                        <h2>Login</h2>
                        <label className="LbLusername" htmlFor="Username">Usuario</label><br />
                        <input name="userName" id="Username" autoComplete="off" /><br />
                        <label className="LbLpassword" htmlFor="Password">Contraseña</label><br />
                        <input name="password" type="password" autoComplete="off" id="Password" />
                        <input type="submit" className="loginButton" name="Login" value="Login" />
                        <span><a href="https://www.ucc.edu.co/servicios-digitales/Paginas/cambio-de-contrasena.aspx" style={{ color: 'white', textDecoration: 'none' }}>¿Olvidó su contraseña?</a></span>
                    </form>
                </div>
                <div className="news">
                    <a href="http://elearning.ucc.edu.co/campus_virtual" target="_blank" rel="noopener noreferrer">
                        <img src="https://campusvirtual.ucc.edu.co/d2l/loginh/images/bnr_plataforma_campusucc.jpg" alt="Plataforma Campus UCC" />
                    </a>
                </div>
                <div className="footer">
                    <p className="copyright">Copyright © <span id="year">2025</span> D2L Corporation. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

