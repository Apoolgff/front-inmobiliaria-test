import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navegador.css'; 
import { useAuth } from '../../services/authContext';
import Dropdown from 'react-bootstrap/Dropdown';
import Buscador from '../Buscador'
import { Swiper, SwiperSlide } from "swiper/react";

const NavBuscador = ({ onLoginClick, onRegistroClick }) => {
    const [error, setError] = useState('');
    const { isAuthenticated, logout } = useAuth(); 
    const [showDropdown, setShowDropdown] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
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
        <header className='header_publicaciones'>
            <div className='home_header'>
                <Link to="/"  className='home_logo'>
                    <img src="/icons/whale.png" alt="logo-lotesdelmar" />
                    <p className='home_logo-title'>Lotesde<span>mar</span></p>
                </Link>
                <Buscador  onSearch={setSearchQuery}/>
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
            </div>

            
            <Swiper style={{ padding: '1rem',
             overflow: 'visible', 
             width: '100vw'
            }} 
            spaceBetween={1} slidesPerView={2} breakpoints={{
                640: { slidesPerView: 2.5 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 7.1}
            }}>
               <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Tipo de operación
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Venta</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Alquiler</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Alquiler temporario</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide>
                <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Caracteristicas
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Proyectos</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Terrenos</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Casas</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Apartamentos</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Chacras</Dropdown.Item>
                        <Dropdown.Item href="#/action-6">Campos</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide>
                <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Departamento
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Venta</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Alquiler</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Alquiler temporario</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide>
                <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Precio
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Venta</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Alquiler</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Alquiler temporario</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide>
                <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Dormitorios
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Venta</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Alquiler</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Alquiler temporario</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide>
                <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Baños
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Venta</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Alquiler</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Alquiler temporario</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide >
                <SwiperSlide >
                    <Dropdown>
                        <Dropdown.Toggle className="publicaciones-boton" id="dropdown-basic">
                        Ordenar por
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Venta</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Alquiler</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Alquiler temporario</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </SwiperSlide>
           </Swiper>
         
            {error && <p className="error-message">{error}</p>}
            
        </header>
    );
};

export default NavBuscador;
