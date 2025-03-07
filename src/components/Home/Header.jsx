import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../services/authContext';

import Buscador from '../Buscador'
import LoginModal from '../modales/LoginModal';
import RegistroModal from '../modales/RegistroModal';
import Navegador from '../Navegadores/Navegador'
import UserNavbar from '../Navegadores/UserNavbar';
import HomeFilters from './HomeFilters';

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? <UserNavbar /> : 
            <Navegador onLoginClick={() => setShowLoginModal(true)}
             onRegistroClick={() => setShowRegistroModal(true)}
                />}

            <section className='home_hero'>
                <h1 className='home_hero-title'>Tu proxima propiedad cerca del mar esta aqui</h1>
                <Buscador />
            </section>

            < HomeFilters />

            {/* Modales */}
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
                onSwitchToRegister={() => { setShowLoginModal(false); setShowRegistroModal(true); }}
            />
            <RegistroModal 
                isOpen={showRegistroModal} 
                onClose={() => setShowRegistroModal(false)} 
                onSwitchToLogin={() => { setShowRegistroModal(false); setShowLoginModal(true); }}
            />
        </>
    );
};

export default Header;
