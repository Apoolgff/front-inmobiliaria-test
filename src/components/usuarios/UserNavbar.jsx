import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/authContext';
import axios from 'axios';
import './UserNavbar.css';

const UserNavbar = () => {
    const [error, setError] = useState('');
    const { setIsAuthenticated, userData } = useAuth(); // Aseguramos que userData está disponible

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cuentas/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);  // Actualiza el estado de autenticación
            window.location.replace('/'); // Redirige al login y recarga la página
        } catch (err) {
            setError('Error al cerrar sesión');
        }
    };

    return (
        <nav className="user-navbar">
             <Link to="/"  className='home_logo'>
                <img src="/icons/whale.png" alt="" />
                <p className='home_logo-title'>Lotesde<span>mar</span></p>
            </Link>
            <ul>
                <li>
                    <Link to="/dashboard" className='home_logo-link'>Inicio</Link>
                </li>
                <li>
                    <Link to="/publicar" className='home_logo-link'>Agregar Propiedad</Link>
                </li>
                <li>
                    <Link to="/ver-publicaciones" className='home_logo-link'>Ver Publicaciones</Link>
                </li>
                <li>
                    {/* El botón de logout ahora se ve como un enlace */}
                    <button onClick={handleLogout} className="logout-button-link">Cerrar sesión</button>
                </li>
            </ul>
            {error && <p className="error-message">{error}</p>}
        </nav>
    );
};

export default UserNavbar;
