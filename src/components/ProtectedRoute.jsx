import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Si aún estamos cargando el estado de autenticación, mostramos un mensaje de carga
    if (loading) {
        return <p>Loading...</p>;  // Puedes reemplazar esto con un componente de carga si prefieres
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;  // Redirige al login si no está autenticado
    }

    return children;  // Si está autenticado, renderiza el contenido protegido
};

export default ProtectedRoute;
