import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/authContext';
import UserNavbar from '../usuarios/UserNavbar';
import { Link } from 'react-router-dom';
import './VerPropiedades.css'

const VerPropiedades = () => {
    const { userData } = useAuth();
    const [propiedades, setPropiedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropiedades = async () => {
            if (!userData || !userData._id) return; // Asegurarse de que userData está cargado

            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/propiedades/usuario/${userData._id}`,
                    { withCredentials: true }
                );
                console.log("Propiedades obtenidas:", response.data); // Depuración
                setPropiedades(response.data);
                setError(null);
            } catch (error) {
                console.error("Error al cargar las propiedades:", error); // Depuración
                setError('Error al cargar las propiedades');
            } finally {
                setLoading(false);
            }
        };

        fetchPropiedades();
    }, [userData?._id]); // Escuchar cambios en userData._id para realizar la consulta cuando esté disponible

    if (!userData || loading) return <p>Cargando propiedades...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <UserNavbar />
            <div className="ver-propiedades">
                <h2>Mis Propiedades</h2>
                <div className="propiedades-grid">
                    {propiedades.map((propiedad) => (
                        <div key={propiedad._id} className="propiedad-card">
                            <h3>{propiedad.titulo}</h3>
                            <p><span>Descripcion: </span>{propiedad.descripcion}</p>
                            <p><span>Tipo: </span>{propiedad.tipo}</p>
                            <p><span>Precio: </span>{propiedad.venta.precio}$</p>
                            
                            <button>
                                <Link to={`/propiedad/${propiedad._id}`}>Ver</Link>
                            </button>
                            <button onClick={() => handleEditar(propiedad._id)}>Editar</button>
                            <button onClick={() => handleEliminar(propiedad._id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default VerPropiedades;
