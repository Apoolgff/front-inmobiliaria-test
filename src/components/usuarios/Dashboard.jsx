// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { useAuth } from '../../services/authContext'; // Importa el hook useAuth
import UserNavbar from './UserNavbar'; // Importa UserNavbar

const Dashboard = () => {
    const { userData, loading, error, setUserData } = useAuth(); // Accede al userData desde el contexto

    useEffect(() => {
        // Esta lógica puede recargar la página si detecta que los datos de usuario no son los esperados
        if (!loading && !userData) {
            window.location.reload(); // Recarga la página si no hay datos de usuario
        }
    }, [loading, userData]); // Se ejecuta cuando cambia el loading o los datos del usuario

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <UserNavbar /> {/* Incluye UserNavbar */}
            <h2>Bienvenido, {userData?.nombre}</h2>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Teléfono:</strong> {userData?.telefono}</p>
            <p><strong>Tipo:</strong> {userData?.tipo}</p>
            {/* Resto de tu dashboard */}
        </div>
    );
};

export default Dashboard;
