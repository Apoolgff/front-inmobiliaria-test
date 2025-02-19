import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../services/authContext';
import './Login.css';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/cuentas/login`,
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setIsAuthenticated(true);
                onClose(); // Cerrar el modal al iniciar sesión correctamente
                window.location.replace('/dashboard');
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>Iniciar Sesión</h2>
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
        </div>
    );
};

export default LoginModal;
