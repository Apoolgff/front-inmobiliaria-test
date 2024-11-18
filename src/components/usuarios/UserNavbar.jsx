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
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);  // Actualiza el estado de autenticación
            window.location.replace('/login'); // Redirige al login y recarga la página
        } catch (err) {
            setError('Error al cerrar sesión');
        }
    };

    return (
        <nav className="user-navbar">
            <ul>
                <li>
                    <Link to="/dashboard">Inicio</Link>
                </li>
                <li>
                    <Link to="/publicar">Agregar Propiedad</Link>
                </li>
                <li>
                    <Link to="/ver-propiedades">Ver Propiedades</Link>
                </li>
                <li>
                    <Link to="/ver-publicaciones">Ver Publicaciones</Link>
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
