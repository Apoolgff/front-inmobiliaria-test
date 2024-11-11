import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            // Solo verificar si no estamos en la página de login y despues colocar las otras rutas
            if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/usuarios/current`,
                        {
                            withCredentials: true,  // Le indica al navegador que envíe las cookies
                        }
                    );

                    setIsAuthenticated(true);
                    setUserData(response.data); // Datos del usuario
                } catch (err) {
                    console.error('Error al verificar token:', err);
                    setIsAuthenticated(false); // Si falla la validación del token
                }
            }

            setLoading(false);
        };

        checkAuthStatus(); // Verificar estado de autenticación al cargar el componente
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
