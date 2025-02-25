import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import './Header.css';
import { useAuth } from '../../services/authContext';
import Buscador from '../utils/SearchBar';
Modal.setAppElement('#root');

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
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
                setShowLoginModal(false);
                window.location.replace('/dashboard');
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <>
            <header className='home_header'>
                <div className='home_logo'>
                    <img src="/icons/whale.png" alt="" />
                    <p className='home_logo-title'>Lotesde<span>mar</span></p>
                </div>
                <div className='home_login'>
                    <p>Publica una propiedad</p>
                    <img 
                        className='home_logo-login' 
                        src="/icons/user.png" 
                        alt="" 
                        onClick={() => setShowLoginModal(true)} 
                    />
                </div>
            </header>

            <section className='home_hero'>
                <h1 className='home_hero-title'>Tu proxima propiedad cerca del mar esta aqui</h1>
                <Buscador />
            </section>

            <section className='home_filters'>
                <h2 className='home_filters-title'>busca rapidamente segun tus preferencias</h2>
                <article className='home_filters_article'>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/project.png" alt="" />
                        proyectos
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/tree.png" alt="" />
                        terrenos
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/house.png" alt="" />
                        casas
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/apartment.png" alt="" />
                        apartamentos
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/grass.png" alt="" />
                        chacras
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/soil.png" alt="" />
                        campos
                    </Link>
                </article>
            </section>

            {/* Modal de Login */}
            <Modal 
                isOpen={showLoginModal} 
                onRequestClose={() => setShowLoginModal(false)}
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
                    <p className="login_modal-pregunta">¿Necesitas una cuenta en Lotes de Mar? </p> 
                    <span className="registro_modal-link" onClick={() => { setShowLoginModal(false); setShowRegistroModal(true); }}>Crea una cuenta</span>
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
                        <button className='login_modal-button ' type="submit">Iniciar Sesión</button>
                        <p>¿Olvidaste la contraseña?</p>
                    </form>
                </div>
            </Modal>

            {/* Modal de Registro */}
            <Modal 
                isOpen={showRegistroModal} 
                onRequestClose={() => setShowRegistroModal(false)}
                contentLabel="Registro Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <div className="login_modal-container">
                    <div className='home_logo'>
                        <img src="/icons/whale.png" alt="" />
                        <p className='home_logo-title'>Lotesde<span>mar</span></p>
                    </div>
                    <p>Regístrate</p>
                    <p className="login_modal-pregunta">¿Ya tienes una cuenta?</p> 
                    <span className="registro_modal-link" onClick={() => { setShowRegistroModal(false); setShowLoginModal(true); }}>Inicia sesión</span>
                    {/* Aquí puedes agregar el formulario de registro */}
                    <form className="login_modal-form">
                        <input className='login_modal-input' type="text" placeholder="Nombre" required />
                        <input className='login_modal-input' type="email" placeholder="Email" required />
                        <input className='login_modal-input' type="password" placeholder="Password" required />
                        <button className='login_modal-button ' type="submit">Registrarse</button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Header;
