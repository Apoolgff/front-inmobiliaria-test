import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authContext';
import axios from 'axios';
import './UserNavbar.css';

const UserNavbar = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);  // Actualiza el estado de autenticación
            navigate('/login');         // Redirige al login
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
                    <Link to="/crear-propiedad">Crear Propiedad</Link>
                </li>
                <li>
                    <Link to="/ver-propiedades">Ver Propiedades</Link>
                </li>
                <li>
                    <Link to="/crear-publicacion">Publicar</Link>
                </li>
                <li>
                    {/* El botón de logout ahora se ve como un enlace */}
                    <button onClick={handleLogout} className="logout-button-link">Cerrar sesión</button>
                </li>
            </ul>
            {error && <p className="error-message">{error}</p>} {/* Muestra un mensaje de error si ocurre */}
        </nav>
    );
};

export default UserNavbar;
