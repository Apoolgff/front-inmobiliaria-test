import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null indica que estamos verificando el estado
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga mientras verificamos el token

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Intentar obtener el usuario actual desde el backend
                await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/current`, { withCredentials: true });
                setIsAuthenticated(true);  // Si tiene sesión activa
            } catch {
                setIsAuthenticated(false);  // Si no está autenticado
            } finally {
                setLoading(false);  // Una vez que se ha terminado la verificación
            }
        };

        checkAuthStatus(); // Llamar a la función para verificar el estado de autenticación
    }, []);
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
