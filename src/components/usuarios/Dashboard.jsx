import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar'; // Importa UserNavbar

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/current`, {
                    withCredentials: true,
                });
                setUserData(response.data);
            } catch (err) {
                setError('No estás autenticado. Redirigiendo al login...');
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <UserNavbar /> {/* Incluye UserNavbar */}
            <h2>Bienvenido, {userData.nombre}</h2>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.telefono}</p>
            {/* Resto de tu dashboard */}
        </div>
    );
};

export default Dashboard;
