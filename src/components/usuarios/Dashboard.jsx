import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Hacemos la solicitud al backend con el token almacenado en las cookies
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/current`, {
                    withCredentials: true, // Asegura que las cookies se envíen con la solicitud
                });
                setUserData(response.data); // Si la respuesta es exitosa, seteamos los datos del usuario
            } catch (err) {
                // Si la solicitud falla (el token no es válido), redirigimos al login
                setError('No estás autenticado. Redirigiendo al login...');
                window.location.href = '/login'; // Redirigir a la página de login
            } finally {
                setLoading(false);
            }
        };

        fetchUserData(); // Llamamos a la función al cargar el componente
    }, []);

    // Función para manejar el logout
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/logout`, {}, { withCredentials: true });
            window.location.href = '/login'; // Redirigir al login después de logout
        } catch (err) {
            setError('Error al cerrar sesión');
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <h2>Bienvenido, {userData.nombre}</h2>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.telefono}</p>
            {/* Botón de Logout */}
            <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </div>
    );
};

export default Dashboard;
