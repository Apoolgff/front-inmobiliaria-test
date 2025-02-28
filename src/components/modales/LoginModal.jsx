import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useAuth } from '../../services/authContext';
import './Modal.css'

Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
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
                onClose();
                window.location.replace('/dashboard');
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose}
            contentLabel="Login Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="login_modal-container">
                <div className='home_logo'>
                    <img src="/icons/whale.png" alt="" />
                    <p className='home_logo-title'>Lotesde<span>mar</span></p>
                </div>
                <p>Inicia Sesión</p>
                <p className="login_modal-pregunta">¿Necesitas una cuenta en Lotes de Mar?</p> 
                <span className="registro_modal-link" onClick={onSwitchToRegister}>Crea una cuenta</span>
                <form onSubmit={handleLogin} className="login_modal-form">
                    <input className='login_modal-input'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input className='login_modal-input'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className='login_modal-button' type="submit">Iniciar Sesión</button>
                    <p>¿Olvidaste la contraseña?</p>
                </form>
            </div>
        </Modal>
    );
};

export default LoginModal;
