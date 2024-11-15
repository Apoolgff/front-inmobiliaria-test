import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/registro">Registro</Link>
                </li>
                <li>
                    <Link to="/ver-publicaciones">Ver Publicaciones</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
