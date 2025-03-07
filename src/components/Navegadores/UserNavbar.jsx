import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/authContext';
import axios from 'axios';
import './Navegador.css'
import Dropdown from 'react-bootstrap/Dropdown';


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
        <header className='home_header'>
             <Link to="/"  className='home_logo'>
                <img src="/icons/whale.png" alt="logo-lotesdelmar"/>
                <p className='home_logo-title'>Lotesde<span>mar</span></p>
            </Link>
           
            <div className='home_login'>
            <Link to="/publicar" className='home_logo-link'>Publica una propiedad</Link>
                <Dropdown>
                    <Dropdown.Toggle className='home_user-container'>
                            <img 
                                className='home_logo-login' 
                                src="/icons/user.png" 
                                alt="Login" 
                            
                            />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='home_logo-drop'>
                        <Dropdown.Item ><Link to="/dashboard">Inicio</Link></Dropdown.Item>
                        <Dropdown.Item ><Link to="/ver-publicaciones" >Ver Publicaciones</Link></Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown>

            </div >
            {error && <p className="error-message">{error}</p>}
        </header>
    );
};

export default UserNavbar;
