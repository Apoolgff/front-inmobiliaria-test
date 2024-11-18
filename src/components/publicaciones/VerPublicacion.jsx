import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './VerPublicacion.css'
import Navbar from '../Navbar'

const VerPublicacion = () => {
    const { pid } = useParams(); // Obtiene el parámetro de la URL
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
            <Navbar />
            <div className="ver-publicacion">
                <h2>{publicacion.titulo}</h2>
                <div className="metadata">
                    <p><strong>Categoría: </strong>{publicacion.tipo}</p>
                </div>
                <p>{publicacion.descripcion}</p>
                <div className="contenido">
                    <h3>Ubicacion:</h3>
                    <p><strong>Departamento: </strong>{publicacion.Ubicacion.departamento}</p>
                    <p><strong>Ciudad: </strong>{publicacion.Ubicacion.ciudad}</p>
                    <p><strong>Frente al mar: </strong>{publicacion.Ubicacion.frentealmar}</p>
                </div>
            </div>
        </>
    );
};

export default VerPublicacion;
