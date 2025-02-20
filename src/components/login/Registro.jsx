// Registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import './Registro.css';

const Registro = () => {
    const [tipo, setTipo] = useState('');
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        usuario: { apellido: '' }, // Subesquema para Usuario
        inmobiliaria: { razon_social: '', rut: '', direccion: '' }, // Subesquema para Inmobiliaria
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (tipo === 'usuario' && name.startsWith('usuario.')) {
            const field = name.split('.')[1];
            setForm((prevForm) => ({
                ...prevForm,
                usuario: { ...prevForm.usuario, [field]: value },
            }));
        } else if (tipo === 'inmobiliaria' && name.startsWith('inmobiliaria.')) {
            const field = name.split('.')[1];
            setForm((prevForm) => ({
                ...prevForm,
                inmobiliaria: { ...prevForm.inmobiliaria, [field]: value },
            }));
        } else {
            setForm((prevForm) => ({ ...prevForm, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar contraseñas coincidan
        if (form.password !== form.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Preparar datos basados en el tipo seleccionado
        const cuentaData = {
            nombre: form.nombre,
            email: form.email,
            telefono: form.telefono,
            password: form.password,
            tipo: tipo === 'usuario' ? 'Usuario' : 'Inmobiliaria',
        };

        if (tipo === 'usuario') {
            cuentaData.usuario = form.usuario;
        } else if (tipo === 'inmobiliaria') {
            cuentaData.inmobiliaria = form.inmobiliaria;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cuentas`, cuentaData);
            if (response.status === 201) {
                alert('Cuenta registrada con éxito');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error al registrar la cuenta:', error);
            alert('Hubo un error al registrar la cuenta. Intenta nuevamente.');
        }
    };

    return (
        <>
            <Navbar />
            <section className='registro_hero'>
                <div className='registro_hero-layer'>
                    <h1 className='registro_hero-titulo' >Publicá en el Portal Inmobiliario No.1 </h1>
                </div>
            </section>
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
                {tipo && (
                    <form onSubmit={handleSubmit}>
                        <input name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                        <input name="telefono" type="text" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
                        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                        <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={form.confirmPassword} onChange={handleChange} required />

                        {tipo === 'usuario' && (
                            <>
                                <input
                                    name="usuario.apellido"
                                    type="text"
                                    placeholder="Apellido"
                                    value={form.usuario.apellido}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        )}

                        {tipo === 'inmobiliaria' && (
                            <>
                                <input
                                    name="inmobiliaria.razon_social"
                                    type="text"
                                    placeholder="Razón Social"
                                    value={form.inmobiliaria.razon_social}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="inmobiliaria.rut"
                                    type="text"
                                    placeholder="RUT"
                                    value={form.inmobiliaria.rut}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="inmobiliaria.direccion"
                                    type="text"
                                    placeholder="Dirección"
                                    value={form.inmobiliaria.direccion}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        )}

                        <button type="submit">Registrar</button>
                    </form>
                )}
                <button className="volver-login" onClick={() => navigate('/login')}>
                    Volver al Login
                </button>
            </div>
        </>
    );
};

export default Registro;
