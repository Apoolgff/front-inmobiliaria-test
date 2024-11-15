// Registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroUsuario from './RegistroUsuario';
import RegistroInmobiliaria from './RegistroInmobiliaria';
import Navbar from '../Navbar'
import './Registro.css';

const Registro = () => {
    const [tipo, setTipo] = useState('');
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="registro-container">
                <h2>Registro</h2>
                <div className="tipo-selector">
                    <label>
                        <input
                            type="radio"
                            value="usuario"
                            checked={tipo === 'usuario'}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        Usuario
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="inmobiliaria"
                            checked={tipo === 'inmobiliaria'}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        Inmobiliaria
                    </label>
                </div>

                {tipo === 'usuario' && <RegistroUsuario />}
                {tipo === 'inmobiliaria' && <RegistroInmobiliaria />}

                <button className="volver-login" onClick={() => navigate('/login')}>
                    Volver al Login
                </button>
            </div>
        </>
    );
};

export default Registro;
