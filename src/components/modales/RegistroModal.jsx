import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './Modal.css'
Modal.setAppElement('#root');

const RegistroModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [tipo, setTipo] = useState('usuario');
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
                navigate('/registro');
            }
        } catch (error) {
            console.error('Error al registrar la cuenta:', error);
            alert('Hubo un error al registrar la cuenta. Intenta nuevamente.');
        }
    };
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose}
            contentLabel="Registro Modal"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="login_modal-container">
                <div className='home_logo'>
                    <img src="/icons/whale.png" alt="" />
                    <p className='home_logo-title'>Lotesde<span>mar</span></p>
                </div>
                <p>Regístrate</p>
                <p className="login_modal-pregunta">¿Ya tienes una cuenta?</p> 
                <span className="registro_modal-link" onClick={onSwitchToLogin}>Inicia sesión</span>
                <div className="tipo-selector">
                    <input
                        type="radio"
                        id="usuario"
                        value="usuario"
                        checked={tipo === "usuario"}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    <label htmlFor="usuario">Usuario</label>

                    <input
                        type="radio"
                        id="inmobiliaria"
                        value="inmobiliaria"
                        checked={tipo === "inmobiliaria"}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                    <label htmlFor="inmobiliaria">Inmobiliaria</label>
                </div>

                <form className="registro_modal-form">
                    <input className = "registro-input" name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                    {tipo === 'usuario' && (
                               
                                    <input
                                        className = "registro-input"
                                        name="usuario.apellido"
                                        type="text"
                                        placeholder="Apellido"
                                        value={form.usuario.apellido}
                                        onChange={handleChange}
                                        required
                                    />
                                
                            )}
                                 {tipo === 'inmobiliaria' && (
                            <div className={`inmobiliaria-fields ${tipo === 'inmobiliaria' ? 'visible' : ''}`}>
                                <input
                                    className = "registro-input"
                                    name="inmobiliaria.razon_social"
                                    type="text"
                                    placeholder="Razón Social"
                                    value={form.inmobiliaria.razon_social}
                                    onChange={handleChange}
                                />
                            
                            </div>
                        )}
                    <input className = "login_modal-input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input className = "login_modal-input" name="telefono" type="text" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
                    {tipo === 'inmobiliaria' && (
                            <div className={`inmobiliaria-fields ${tipo === 'inmobiliaria' ? 'visible' : ''}`}>
                       
                                <input
                                    className = "registro-input"
                                    name="inmobiliaria.rut"
                                    type="text"
                                    placeholder="RUT"
                                    value={form.inmobiliaria.rut}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {tipo === 'inmobiliaria' && (
                            <div className={`inmobiliaria-fields ${tipo === 'inmobiliaria' ? 'visible' : ''}`}>
                                <input
                                    className = "registro-input"
                                    name="inmobiliaria.direccion"
                                    type="text"
                                    placeholder="Dirección"
                                    value={form.inmobiliaria.direccion}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    <input className = "login_modal-input" name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                    <input className ="login_modal-input" name="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={form.confirmPassword} onChange={handleChange} required />
                    <button className='login_modal-button' type="submit">Registrarse</button>
                </form>
            </div>
        </Modal>
    );
};

export default RegistroModal;
