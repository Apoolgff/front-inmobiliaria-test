import React, { useState } from 'react';
import axios from 'axios';
import './Registro.css';

const RegistroUsuario = () => {
    const [form, setForm] = useState({
        nombre: '', apellido: '', email: '', telefono: '', password: '', confirmPassword: ''
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
        const usuarioData = {
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            telefono: form.telefono,
            password: form.password, // Asegúrate de no enviar la confirmación de contraseña
        };

        try {
            // Enviar solicitud POST al backend
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, usuarioData);

            if (response.status === 201) {
                // Si la creación es exitosa, puedes redirigir o mostrar un mensaje
                alert('Usuario registrado con éxito');
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Hubo un error al registrar el usuario. Intenta nuevamente.');
        }
    };

    return (
        <div className="form-container">
            <h3>Registro Usuario</h3>
            <form onSubmit={handleSubmit}>
                <input name="nombre" type="text" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input name="apellido" type="text" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="telefono" type="text" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
                <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={form.confirmPassword} onChange={handleChange} required />
                <button type="submit">Registrar Usuario</button>
            </form>
        </div>
    );
};

export default RegistroUsuario;
