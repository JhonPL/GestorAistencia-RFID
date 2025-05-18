import { useEffect, useContext, useRef } from 'react';
import { displayThemeButtons, startAutoTheme } from './themes';
import "./LoginPage.css";
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    useEffect(() => {
        displayThemeButtons();
        startAutoTheme(5000);
    }, []);

    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario, contrasena }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/cursos");
            } else {
                setError(data.mensaje || "Login fallido");
            }
        } catch (error){
            console.error("Error en la conexión");
        }
    };

    return (
        <>
            <div className="main-container">
                <section className="container">
                    <div className="login-container">
                        <div className="circle circle-one"></div>
                        <div className="form-container">
                            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                            <h1 className="opacity">LOGIN</h1>
                            <form onSubmit={handleLogin}>
                                <input type="text" placeholder="USERNAME" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                                <input type="password" placeholder="PASSWORD" value ={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                                <button className="opacity" type='submit'>Iniciar Sesión</button>
                            </form>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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