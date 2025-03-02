import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navegador.css'; 
import { useAuth } from '../../services/authContext';
import Dropdown from 'react-bootstrap/Dropdown';

const Navegador = ({ onLoginClick, onRegistroClick }) => {
    const [error, setError] = useState('');
    const { isAuthenticated, logout } = useAuth(); 
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLoginClick = () => {
        if (isAuthenticated) {
            setShowDropdown(!showDropdown);
        } else {
            onLoginClick();
        }
    };
    const handleRegistroClick = () => {
        if (isAuthenticated) {
            setShowDropdown(!showDropdown);
        } else {
            onRegistroClick();
        }
    };

    return (
        <header className='home_header'>
             <Link to="/"  className='home_logo'>
                <img src="/icons/whale.png" alt="logo-lotesdelmar" />
                <p className='home_logo-title'>Lotesde<span>mar</span></p>
            </Link>
            <nav>
                <ul className='home_nav'>
                    <li>
                    <Link to="/ver-publicaciones" className='home_nav-link'>Venta</Link>
                    </li>
                    <li>
                    <Link to="/ver-publicaciones" className='home_nav-link'>Alquiler</Link>
                    </li>
                    <li>
                    <Link to="/ver-publicaciones" className='home_nav-link'>Inmobiliarias</Link>
                    </li>
                </ul>
            </nav>
            <div className='home_login'>
            <Link to="/" className='home_logo-link'>Publica una propiedad</Link>
                <Dropdown>
                    <Dropdown.Toggle className='home_user-container'>
                            <img 
                                className='home_logo-login' 
                                src="/icons/user.png" 
                                alt="Login" 
                            
                            />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='home_logo-drop'>
                        <Dropdown.Item onClick={handleLoginClick}>Ingresar</Dropdown.Item>
                        <Dropdown.Item onClick={handleRegistroClick}>Registrarse</Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown>

            </div >
            {error && <p className="error-message">{error}</p>}
            
        </header>
    );
};

export default Navegador;
