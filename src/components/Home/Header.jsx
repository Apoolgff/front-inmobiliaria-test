import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../services/authContext';

import Buscador from '../utils/SearchBar';
import LoginModal from '../modales/LoginModal';
import RegistroModal from '../modales/RegistroModal';
import Navegador from './Navegador'
import UserNavbar from '../usuarios/UserNavbar';

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? <UserNavbar /> : <Navegador onLoginClick={() => setShowLoginModal(true)} />}


            <section className='home_hero'>
                <h1 className='home_hero-title'>Tu proxima propiedad cerca del mar esta aqui</h1>
                <Buscador />
            </section>

            <section className='home_filters'>
                <h2 className='home_filters-title'>Busca rápidamente según tus preferencias</h2>
                <article className='home_filters_article'>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/project.png" alt="" />
                        Proyectos
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/tree.png" alt="" />
                        Terrenos
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/house.png" alt="" />
                        Casas
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/apartment.png" alt="" />
                        Apartamentos
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/grass.png" alt="" />
                        Chacras
                    </Link>
                    <Link className='home_filters_article-links' to='#'>
                        <img src="/icons/soil.png" alt="" />
                        Campos
                    </Link>
                </article>
            </section>

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
