import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from '../utils/SearchBar';
import LoginModal from '../login/LoginModal'; // Importa el modal
import { useAuth } from '../../services/authContext'; // Importa el contexto de autenticación

const Header = () => {
    const { isAuthenticated } = useAuth(); // Verifica si el usuario está autenticado
    const [showModal, setShowModal] = useState(false);

    const handleLoginClick = () => {
        setShowModal(true);
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
                    <img className='home_logo-login' src="/icons/user.png" alt="" onClick={handleLoginClick} />
                </div>
            </header>

            <section className='home_hero'>
                <h1 className='home_hero-title'>vivir y vacacionar junto al mar</h1>
                <SearchBar />
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

            {/* Renderiza el modal solo si showModal es true */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <LoginModal onClose={() => setShowModal(false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
