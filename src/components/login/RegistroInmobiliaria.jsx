import React, { useState } from 'react';
import axios from 'axios';
import './Registro.css';

const RegistroInmobiliaria = () => {
    const [form, setForm] = useState({
        nombre: '', rut: '', razon_social: '', telefono: '', direccion: '', email: '', password: '', confirmPassword: '', descripcion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar que las contraseñas coinciden
        if (form.password !== form.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Datos del formulario para enviar al backend
        const inmobiliariaData = {
            nombre: form.nombre,
            rut: form.rut,
            razon_social: form.razon_social,
            telefono: form.telefono,
            direccion: form.direccion,
            email: form.email,
            password: form.password, // No enviar confirmación de contraseña
            descripcion: form.descripcion
        };

        try {
            // Enviar solicitud POST al backend
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/inmobiliaria`, inmobiliariaData);

            if (response.status === 201) {
                // Si la creación es exitosa, puedes redirigir o mostrar un mensaje
                alert('Inmobiliaria registrada con éxito');
            }
        } catch (error) {
            console.error('Error al registrar la inmobiliaria:', error);
            alert('Hubo un error al registrar la inmobiliaria. Intenta nuevamente.');
        }
    };

    return (
        <div className="form-container">
            <h3>Registro Inmobiliaria</h3>
            <form onSubmit={handleSubmit}>
                <input name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input name="rut" type="text" placeholder="RUT" value={form.rut} onChange={handleChange} required />
                <input name="razon_social" type="text" placeholder="Razón Social" value={form.razon_social} onChange={handleChange} required />
                <input name="telefono" type="text" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
                <input name="direccion" type="text" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={form.confirmPassword} onChange={handleChange} required />
                <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange}></textarea>
                <button type="submit">Registrar Inmobiliaria</button>
            </form>
        </div>
    );
};

export default RegistroInmobiliaria;
