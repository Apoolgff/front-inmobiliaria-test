import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import RegistroUsuario from './components/login/RegistroUsuario';
import RegistroInmobiliaria from './components/login/RegistroInmobiliaria';
import Dashboard from './components/usuarios/Dashboard';
import CrearPropiedad from './components/propiedades/CrearPropiedad';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './services/authContext';  // Aquí importas el AuthProvider

function App() {
    return (
        <AuthProvider> {/* El AuthProvider envuelve toda la app */}
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/registro/usuario" element={<RegistroUsuario />} />
                        <Route path="/registro/inmobiliaria" element={<RegistroInmobiliaria />} />
                        
                        {/* Rutas protegidas */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/crear-propiedad"
                            element={
                                <ProtectedRoute>
                                    <CrearPropiedad />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
