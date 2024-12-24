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

            if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/cuentas/current`,
                        { withCredentials: true }
                    );

                    setIsAuthenticated(true);
                    setUserData(response.data); 
                } catch (err) {
                    console.error('Error al verificar token:', err);
                    setIsAuthenticated(false); 
                    setUserData(null); 
                    window.location.href = '/login'; 
                }
            }
            setLoading(false); 
        };

        checkAuthStatus();
    }, []); 

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
