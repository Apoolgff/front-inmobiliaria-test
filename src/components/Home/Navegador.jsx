import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import { useAuth } from '../../services/authContext';

const Navegador = ({ onLoginClick }) => {
    const { isAuthenticated, logout } = useAuth(); 
    const [showDropdown, setShowDropdown] = useState(false);

    const handleUserClick = () => {
        if (isAuthenticated) {
            setShowDropdown(!showDropdown);
        } else {
            onLoginClick();
        }
    };

    return (
        <header className='home_header'>
             <Link to="/"  className='home_logo'>
                <img src="/icons/whale.png" alt="" />
                <p className='home_logo-title'>Lotesde<span>mar</span></p>
            </Link>
            <div className='home_login'>
                <p>Publica una propiedad</p>
                <div className='home_user-container'>
                    {isAuthenticated ? (
                        // Cuando el usuario está autenticado, cambia todo el botón
                        <div className="user_logged-in" onClick={handleUserClick}>
                            <img 
                                className='home_logo-login' 
                                src="/icons/user.png" 
                                alt="Usuario" 
                            />
                            <p className="user_name">Mi cuenta</p>
                            {showDropdown && (
                                <div className="user_dropdown">
                                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                                    <button onClick={logout} className="dropdown-item">Cerrar sesión</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Botón original si no está autenticado
                        <img 
                            className='home_logo-login' 
                            src="/icons/user.png" 
                            alt="Login" 
                            onClick={handleUserClick} 
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navegador;
