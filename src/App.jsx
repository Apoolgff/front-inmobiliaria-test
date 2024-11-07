import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import RegistroUsuario from './components/login/RegistroUsuario';
import RegistroInmobiliaria from './components/login/RegistroInmobiliaria';
import Dashboard from './components/usuarios/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './services/authContext'; // Asegúrate de que esté correctamente importado

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/registro/usuario" element={<RegistroUsuario />} />
                        <Route path="/registro/inmobiliaria" element={<RegistroInmobiliaria />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
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
