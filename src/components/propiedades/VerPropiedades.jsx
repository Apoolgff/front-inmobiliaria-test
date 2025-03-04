import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/authContext'; // Accedemos al contexto de autenticación
import UserNavbar from '../Navegadores/UserNavbar';
import { Link } from 'react-router-dom';
import './VerPropiedades.css';

const VerPropiedades = () => {
    const { loading: userLoading, isAuthenticated, userData } = useAuth(); // Accedemos a userData desde el contexto
    const [propiedades, setPropiedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userLoading) {
            console.log("Cargando autenticación...");
            return;
        }

        if (!isAuthenticated) {
            console.log("No autenticado, redirigiendo...");
            // Aquí podrías redirigir al login o mostrar un mensaje
            return;
        }

        const fetchPropiedades = async () => {
            setLoading(true);
            console.log(`Solicitando propiedades para el usuario ${userData._id}`);

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/propiedades/usuario/${userData._id}`,
                    { withCredentials: true }
                );
                console.log('Propiedades recibidas:', response.data);
                setPropiedades(response.data);
                setError(null);
            } catch (err) {
                console.error("No tienes propiedades disponibles.", err);
                setError('No tienes propiedades disponibles.');
                setPropiedades([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPropiedades();
    }, [userData, userLoading, isAuthenticated]);

    if (loading) return <p>Cargando propiedades...</p>;

    return (
        <>
            <UserNavbar /> {/* Aseguramos que UserNavbar siempre se muestre */}
            <div className="ver-propiedades">
                <h2>Mis Propiedades</h2>
                {error ? (
                    <div className="no-propiedades">
                        <p>{error}</p>
                        <button>
                            <Link to="/crear-propiedad">Agregar propiedad</Link>
                        </button>
                    </div>
                ) : (
                    <>
                        {propiedades.length > 0 ? (
                            <div className="propiedades-grid">
                                {propiedades.map((propiedad) => (
                                    <div key={propiedad._id} className="propiedad-card">
                                        <h3>{propiedad.titulo}</h3>
                                        <p><span>Descripción: </span>{propiedad.descripcion}</p>
                                        <p><span>Tipo: </span>{propiedad.tipo}</p>
                                        <p><span>Precio: </span>{propiedad.venta.precio}$</p>

                                        <button>
                                            <Link to={`/propiedad/${propiedad._id}`}>Ver</Link>
                                        </button>
                                        <button>
                                            <Link to={`/modificar-propiedad/${propiedad._id}`}>Editar</Link>
                                        </button>
                                        <button onClick={() => handleEliminar(propiedad._id)}>Eliminar</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-propiedades">
                                <p>No tienes propiedades disponibles.</p>
                                <button>
                                    <Link to="/crear-propiedad">Agregar propiedad</Link>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default VerPropiedades;
