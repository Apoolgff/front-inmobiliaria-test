import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, sessionExpired, setSessionExpired } = useAuth();

    useEffect(() => {
        if (sessionExpired) {
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            setSessionExpired(false); // Reiniciar el estado para que no se repita la alerta
        }
    }, [sessionExpired, setSessionExpired]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    if (sessionExpired) {
    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    setSessionExpired(false); // Reinicia el estado
    return <Navigate to="/" />;
}


    return children;
};

export default ProtectedRoute;
