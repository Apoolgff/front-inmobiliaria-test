// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            // Evitar validar en rutas de login o home
            if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/usuarios/current`,
                        { withCredentials: true }
                    );

                    setIsAuthenticated(true);
                    setUserData(response.data); // Datos del usuario
                } catch (err) {
                    console.error('Error al verificar token:', err);
                    setIsAuthenticated(false); // Si falla la validación del token
                    setUserData(null); // Limpiamos los datos si no está autenticado
                    window.location.href = '/login'; // Redirige si no está autenticado
                }
            }
            setLoading(false); // Aseguramos que siempre se termina el loading
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
