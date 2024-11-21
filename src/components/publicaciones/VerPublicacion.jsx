import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './VerPublicacion.css';
import Navbar from '../Navbar';
import UserNavbar from '../usuarios/UserNavbar';  // Importar UserNavbar
import { useAuth } from '../../services/authContext';  // Importar el hook useAuth

const VerPublicacion = () => {
    const { pid } = useParams(); // Obtiene el parámetro de la URL
    const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación
    const [publicacion, setPublicacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/publicacion/${pid}`);
                setPublicacion(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error al cargar la publicación');
                setLoading(false);
            }
        };

        fetchPublicacion();
    }, [pid]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {/* Muestra el Navbar dependiendo de la autenticación */}
            {isAuthenticated ? <UserNavbar /> : <Navbar />}

            <div className="ver-publicacion">
                <h2>{publicacion.titulo}</h2>
                <div className="metadata">
                    <p><strong>Categoría: </strong>{publicacion.tipo}</p>
                </div>
                <div className="propietario-container">
                    <p><strong>Propietario: </strong>{publicacion.propietario.nombre}</p>
                    <p><strong>Telefono: </strong>{publicacion.propietario.telefono}</p>
                    <p><strong>Email: </strong>{publicacion.propietario.email}</p>
                </div>
                <p>{publicacion.descripcion}</p>
                <div className="contenido">
                    <h3>Ubicacion:</h3>
                    <p><strong>Departamento: </strong>{publicacion.Ubicacion.departamento}</p>
                    <p><strong>Ciudad: </strong>{publicacion.Ubicacion.ciudad}</p>
                    <p><strong>Frente al mar: </strong>{publicacion.Ubicacion.frentealmar}</p>
                </div>
                <div className="caracteristicas">
                    <h3>Características:</h3>
                    {publicacion.Caracteristicas && Object.entries(publicacion.Caracteristicas)
                        .filter(([key, value]) =>
                            key !== '_id' && value !== null && value !== undefined && value !== ''
                        )
                        .map(([key, value]) => (
                            <p key={key}>
                                <strong>{key}: </strong>{value.toString()}
                            </p>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default VerPublicacion;
