import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import './Login.css';
import { useAuth } from '../../services/authContext';  // Importa el contexto de autenticación

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();  // Desestructura setIsAuthenticated

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/usuarios/login`,
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setIsAuthenticated(true);  // Actualiza el estado de autenticación
                window.location.replace('/dashboard');  // Redirige y recarga la página
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Iniciar Sesión</button>
                    <p>¿No tienes una cuenta?
                        <Link to="/registro" className="registro-link"> Regístrate aquí</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
